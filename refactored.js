const publish = require('./publish');

const UserStorageService = require('./UserStorageService');

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

const userStorageService = new UserStorageService(publish);

const initialStorageData = userStorageService.getUsers();
console.log(initialStorageData);

userStorageService.addUser(user);
userStorageService.addUsers(users);

const userId = 2;
const foundUser = userStorageService.getUserById(userId);
console.log('Found user with id 2:', foundUser);

const averageAge = userStorageService.getUsersAverageAge();
console.log('\nAverage users age:', averageAge);
