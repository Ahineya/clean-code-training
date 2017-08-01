const publish = require('./publish');

class BadStorageService {

    add(user, doNotFireEvent) {
        if (this.data) {
            this.data.push(user);
        } else {
            this.data = [];
            this.data.push(user);
        }

        if (!doNotFireEvent) {
            publish('USERS_ADDED', this.data);
        }
    }

    addData(users) {
        if (this.data) {
            for (let i = 0; i < users.length; i++) {
                this.add(users[i], true);
            }
        } else {
            this.data = [];
            for (let i = 0; i < users.length; i++) {
                this.add(users[i], true);
            }
        }

        publish('USERS_ADDED', this.data);
    }

    get(user) {
        let foundUser = null;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].id == user) {
                foundUser = this.data[i];
            }
        }

        return foundUser;
    }

    getData() {
        return this.data;
    }

    getAverageAge() {
        if (this.data) {
            if (this.data.length) {
                let age = 0;
                for (let i = 0; i < this.data.length; i++) {
                    age += this.data[i].age;
                }
                return age / this.data.length;
            } else {
                return 0;
            }
        } else {
            return 0;
        }
    }

}

module.exports = BadStorageService;
