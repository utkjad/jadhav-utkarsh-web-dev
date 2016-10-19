(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService ) {
        var vm = this;
        vm.register = register;
        vm.clear = clear;
        vm.cancel = cancel;

        function init() {
            console.log("RegisterController loaded");
        }
        init();

        function register(user) {
            if(user.username){
                if(user.password === user.verifyPassword){
                    returnedUser = UserService.createUser(user);

                    if (returnedUser) {
                        $location.url("/user/" + user._id);
                    } else{
                        vm.alert = "Could not create user."
                    }
                } else {
                    vm.alert = "Passwords do not match.";
                }
            } else {
                vm.alert = "Enter username."
            }

        }

        function cancel() {
            $location.url("/login");
        }

        // clear your previous message first before alerting anything
        function clear() {
            vm.alert = "";
        }
    }

})();