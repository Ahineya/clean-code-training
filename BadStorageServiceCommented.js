const publish = require('./publish'); // Non-injected dependency

// Bad naming
class BadStorageService {

    /*
        Bad naming
        After reusing this method in addData, we've added _doNotFireEvent parameter,
        which is bad for open class API
     */
    add(user, _doNotFireEvent) {
        /*
            Checking for property existence instead of creating a property in constructor, or as static one
            Extremely bad naming
         */
        if (this.data) {
            this.data.push(user); // Mutation of array
        } else {
            this.data = []; // Object property initialization from method
            this.data.push(user);
        }

        // Logical and lexical 'not'. Extremely shitty
        if (!_doNotFireEvent) {
            publish('USERS_ADDED', this.data);
        }
    }

    /*
        Bad naming
     */
    addData(users) {
        if (this.data) {
            for (let i = 0; i < users.length; i++) { // On each iteration we're accessing .length property
                this.add(users[i], true); // Using _doNotFireEvent parameter, easy to forget
            }
        } else {
            this.data = []; // Initialization of property without using it in method directly
            for (let i = 0; i < users.length; i++) {
                this.add(users[i], true);
            }
        }

        publish('USERS_ADDED', this.data);
    }

    // Bad parameter naming
    get(user) {
        let foundUser = null;
        for (let i = 0; i < this.data.length; i++) { // Missing check for this.data existence
            if (this.data[i].id == user) { // Non-strict comparison
                foundUser = this.data[i]; // No exit after found value
            }
        }

        return foundUser;
    }

    // Bad naming
    getData() {
        return this.data;
    }

    // Cyclomatic complexity 4
    getAverageAge() {
        if (this.data) { // Two ifs instead one creates similar returns
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
