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
        }

        function findUserByID(userId) {
            var url = "/api/user/" +  userId;
            return $http.get(url);
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
        }

        function updateUser(userId, user) {
            var url = "/api/user/" +  userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/" +  userId;
            return $http.delete(url);
        }
    }

})();