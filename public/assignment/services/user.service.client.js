( function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];


        var api = {
            createUser: createUser,
            findUserByID: findUserByID,
            findUserByUsername: findUserByUsername,
            updateUser:updateUser,
            deleteUser:deleteUser,
            findUserByCredentials: findUserByCredentials,
            findUserByID: findUserByID
        };
        return api;

        function createUser(user) {
            var newUser = {
                _id : (new Date()).getTime() + "",
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            };
            users.push(newUser);
            return newUser;
        }

        function findUserByID(userId) {
            for (var u in users){
                user = users[u];
                if (parseInt(user._id) ===  parseInt(userId)){
                    return user;
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users){
                user = users[u];
                if (user.username === username){
                    return user;
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users){
                var user = users[u];
                if (user.username === username
                    && user.password === password){
                    return user;
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var u in users){
                currentUser = users[u];
                if (parseInt(currentUser._id) ===  parseInt(userId)){
                    currentUser.firstName = user.firstName;
                    currentUser.lastName = user.lastName;
                    currentUser.email = user.email;
                    return true;
                }
                return false;
            }
        }

        function deleteUser(userId) {
            for (var i in users){
                user = users[i];
                if (parseInt(user._id) ===  parseInt(userId)){
                    users.splice(i, 1);
                }
            }
            return null;
        }
    }

})();