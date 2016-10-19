(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService ) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.updateUser= updateUser;
        vm.website = website;
        vm.logout = logout;
        vm.clear = clear;
        
        function init() {
            console.log("ProfileController loaded");
            var user = UserService.findUserByID(userId);

            if (user){
                console.log("Found User");
                vm.user = user;
            } else{
                console.log("User Not Found");
            }
        }
        init();

        function updateUser(user) {
            updateStatus = UserService.updateUser(vm.userId, user);
            if (updateStatus) {
                vm.success = "User updated";
            }else {
                vm.alert = "Cannot update user.";
            }
        }

        function website() {
            $location.url("/user/" + vm.userID);
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