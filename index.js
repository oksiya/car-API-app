import express from 'express';
import axios from 'axios';
import cors from 'cors';

function mostPopularCar(cars) {
    let make;
    let obj = {};
    for (let i in cars) {
        let car = cars[i];
        if (obj[car.make] === undefined) {
            obj[car.make] = 0;
        }
        obj[car.make]++;
    }
    let maxNum = -Infinity;
    for (let i in obj) {
        if (obj[i] > maxNum) {
            maxNum = obj[i];
            make = i;
        }
    }
    return make;
}

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

let cars = [];

// Fetch car data from external source
const fetchCarData = async () => {
    try {
        const response = await axios.get('https://bootcamp.projectcodex.co/cars.json');
        cars = response.data;
    } catch (error) {
        console.error('Error fetching car data:', error);
    }
};

// Fetch car data when starting the server
fetchCarData();

// Get the most popular car make
app.get('/api/mostPopularCar', (req, res) => {
    const popularCarMake = mostPopularCar(cars);
    res.json({ mostPopularCar: popularCarMake });
});

// Get all cars
app.get('/api/cars', (req, res) => {
    res.json(cars);
});


app.listen(3007, function () {
    console.log('Example app listening on port 3007');
});
