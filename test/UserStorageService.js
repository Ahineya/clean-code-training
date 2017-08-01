const sinon = require('sinon');
const assert = require('assert');

const UserStorageService = require('../UserStorageService');

describe('UserStorageService', () => {
    let sut;
    let publishSpy;

    const testUser = {
        id: 1,
        name: 'Alice',
        age: 30
    };

    const testUsers = [
        {
            id: 2,
            name: 'Bob',
            age: 20
        },
        {
            id: 3,
            name: 'Charlie',
            age: 30
        }
    ];

    beforeEach(() => {
        publishSpy = sinon.spy();
        sut = new UserStorageService(publishSpy);
    });

    describe('constructor', () => {
        it('should create empty users array', () => {
            assert.deepEqual(sut.users, []);
        });
    });

    describe('addUser', () => {
        it('should add user', () => {
            sut.addUser(testUser);
            sinon.assert.calledWith(publishSpy, 'USERS_ADDED', [testUser]);
        });
    });

    describe('addUsers', () => {
        it('should add multiple users', () => {
            sut.addUsers(testUsers);
            sinon.assert.calledWith(publishSpy, 'USERS_ADDED', testUsers);
        });
    });

    describe('getUserById', () => {
        it('should get user by id', () => {
            sut.addUsers(testUsers);
            const user = sut.getUserById(testUsers[0].id);
            assert.equal(user, testUsers[0]);
        });
        it('should return null if there are no user with id', () => {
            sut.addUsers(testUsers);
            const user = sut.getUserById(42);
            assert.equal(user, null);
        });
    });

    describe('getUsers', () => {
        it('should get empty array if there are no users', () => {
            const users = sut.getUsers();
            assert.deepEqual(sut.users, []);
        });

        it('should get added users', () => {
            sut.addUsers(testUsers);
            sut.addUser(testUser);
            const users = sut.getUsers();
            assert.deepEqual(sut.users, testUsers.concat(testUser));
        });
    });

    describe('getUsersAverageAge', () => {
        it('should return average age for users', () => {
            sut.addUsers(testUsers);
            const averageAge = sut.getUsersAverageAge();
            assert.equal(averageAge, 25);
        });
    });
});
