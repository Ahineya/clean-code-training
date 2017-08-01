const BadStorageService = require('./BadStorageService');

const user = {
    id: 1,
    name: 'Alice',
    age: 30
};

const users = [
    {
        id: 2,
        name: 'Bob',
        age: 20
    },
    {
        id: 3,
        name: 'Charlie',
        age: 40
    }
];

const badStorageService = new BadStorageService();

const initialStorageData = badStorageService.getData();
console.log(initialStorageData);

badStorageService.add(user);
badStorageService.addData(users);

const userId = 2;
const foundUser = badStorageService.get(userId);
console.log('Found user with id 2:', foundUser);

const averageAge = badStorageService.getAverageAge();
console.log('\nAverage users age:', averageAge);
