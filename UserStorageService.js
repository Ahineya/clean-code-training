class UserStorageService {

    constructor(publish) {
        this.users = [];
        this.publish = publish;
    }

    addUser(user) {
        this.users = this.users.concat(user);
        this.publish('USERS_ADDED', this.users);
    }

    addUsers(users) {
        this.users = this.users.concat(users);
        this.publish('USERS_ADDED', this.users);
    }

    getUserById(userId) {
        return this.users.find(u => u.id === userId) || null;
    }

    getUsers() {
        return this.users;
    }

    getUsersAverageAge() {
        return this.users.reduce((acc, curr) => acc + curr.age, 0) / this.users.length;
    }

}

module.exports = UserStorageService;
