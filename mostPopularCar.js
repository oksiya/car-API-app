export default function mostPopularCar(cars) {
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