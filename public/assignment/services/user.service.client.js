( function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService($http) {
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
            var url = "/api/user/";
            return $http.post(url, user);
            // var newUser = {
            //     _id : (new Date()).getTime() + "",
            //     username: user.username,
            //     password: user.password,
            //     firstName: user.firstName,
            //     lastName: user.lastName
            // };
            // users.push(newUser);
            // return newUser;
        }

        function findUserByID(userId) {
            var url = "/api/user/" +  userId;
            return $http.get(url);
            // for (var u in users){
            //     user = users[u];
            //     if (parseInt(user._id) ===  parseInt(userId)){
            //         return user;
            //     }
            // }
            // return null;
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
            var url = '/api/user?username=' + username + "&password=" + password;
            return $http.get(url);
            // for (var u in users){
            //     var user = users[u];
            //     if (user.username === username
            //         && user.password === password){
            //         return user;
            //     }
            // }
            // return null;
        }

        function updateUser(userId, user) {
            var url = "/api/user/" +  userId;
            return $http.put(url, user);
            // for (var u in users){
            //     currentUser = users[u];
            //     if (parseInt(currentUser._id) ===  parseInt(userId)){
            //         currentUser.firstName = user.firstName;
            //         currentUser.lastName = user.lastName;
            //         currentUser.email = user.email;
            //         return true;
            //     }
            //     return false;
            // }
        }

        function deleteUser(userId) {
            var url = "/api/user/" +  userId;
            return $http.delete(url);
        }
    }

})();