(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService ) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.updateUser= updateUser;
        vm.website = website;
        vm.logout = logout;
        vm.clear = clear;
        vm.deleteUser = deleteUser;
        
        function init() {
            console.log("ProfileController loaded");
            UserService
                .findUserByID(vm.userId)
                .success(function (user) {
                    if (user){
                        vm.user = user;
                    } else{
                        console.log("User Not Found" + user);
                    }
                })
                .error(function (err) {
                    console.log(err);
                });

        }
        init();

        function updateUser(user) {
            UserService
                .updateUser(vm.userId, user)
                .success(function (response) {
                    vm.success = "User updated";
                })
                .error(function (err) {
                    vm.alert = "Cannot update user.";
                })
        }

        function deleteUser(user) {
            UserService
                .deleteUser(vm.userId)
                .success(function (retUser){
                    console.log("user deleted successfully!");
                    $location.url("/login");
                })
                .error(function (err){
                    vm.alert = "Cannot Delete User!"
                })
        }

        function website() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function logout() {
            $location.url("/login");
        }

        // clear your previous message first before alerting anything
        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }

})();