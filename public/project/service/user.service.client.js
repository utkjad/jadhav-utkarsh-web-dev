(function () {

    angular
        .module('MRApp')
        .factory('UserService', UserService);

    function UserService($rootScope, $http) {

        var baseAdminUrl = "/mr/admin/user";
        var baseUserUrl = "/mr/user/";
        var api = {
            createUserByAdmin: createUserByAdmin,
            deleteUserByAdmin: deleteUserByAdmin,
            findAllUsersForAdmin: findAllUsersForAdmin,
            updateUserByAdmin: updateUserByAdmin,

            deleteUserById: deleteUserById,
            findAllFollowingUsers: findAllFollowingUsers,
            findAllFollowers: findAllFollowers,
            findAllLikedMovies: findAllLikedMovies,
            findUserById: findUserById,
            follow: follow,
            getCurrentUser: getCurrentUser,
            isFollowing: isFollowing,
            isLiked: isLiked,
            like: like,
            login: login,
            logout: logout,
            register: register,
            setCurrentUser: setCurrentUser,
            unfollow: unfollow,
            unlike: unlike,
            updateUser: updateUser
        };
        return api;

        function createUserByAdmin(user) {
            var url = baseAdminUrl;
            return $http.post(url, user);
        }

        function deleteUserByAdmin(userId) {
            var url = baseAdminUrl + "/" + userId;
            return $http.delete(url);
        }

        function findAllUsersForAdmin() {
            var url = "/mr/admin/users";
            return $http.get(url);
        }

        function updateUserByAdmin(userId, user) {
            var url = baseAdminUrl + "/" + userId;
            return $http.put(url, user);
        }

        function deleteUserById(userId) {
            var url = baseUserUrl + userId;
            return $http.delete(url);
        }

        function findAllFollowingUsers(userId) {
            var url = baseUserUrl + userId + "/following";
            return $http.get(url);
        }

        function findAllFollowers(userId) {
            var url = baseUserUrl + userId + "/followers";
            return $http.get(url);
        }

        function findAllLikedMovies(userId) {
            var url = baseUserUrl + userId + "/likes";
            return $http.get(url);
        }

        function findUserById(userId) {
            var url = baseUserUrl + userId;
            return $http.get(url);
        }

        function follow(userId, followId) {
            var url = baseUserUrl + userId + "/follow/" + followId;
            return $http.put(url);
        }

        function getCurrentUser() {
            var url = "/mr/loggedin";
            return $http.get(url);
        }

        function isFollowing(userId, followId) {
            var url = baseUserUrl + userId + "/isfollowing/" + followId;
            return $http.get(url);
        }

        function isLiked(userId, movieId) {
            var url = baseUserUrl + userId + "/movie/" + movieId + "/isLiked";
            return $http.get(url);
        }

        function like(userId, movieId) {
            var url = baseUserUrl + userId + "/movie/" + movieId + "/like";
            return $http.put(url);
        }

        function login(user) {
            var url = "/mr/login";
            return $http.post(url, user);
        }

        function logout() {
            var url = "/mr/logout";
            return $http.post(url);
        }

        function register(user) {
            var url = "/mr/register";
            return $http.post(url, user);
        }

        function setCurrentUser(user) {
            $rootScope.user = user;
        }

        function unfollow(userId, unfollowId) {
            var url = baseUserUrl + userId + "/unfollow/" + unfollowId;
            return $http.put(url);
        }

        function unlike(userId, movieId) {
            var url = baseUserUrl + userId + "/movie/" + movieId + "/unlike";
            return $http.put(url);
        }

        function updateUser(userId, user) {
            var url = baseUserUrl + userId;
            return $http.put(url, user);
        }

    }

})();