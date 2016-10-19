(function(){
        angular
            .module('WebAppMaker')
            .controller('LoginController', LoginController);

        function LoginController($location, UserService) {
            var vm = this;
            vm.login = login;
            vm.register = register;

            function init() {
                console.log("LoginController loaded");
            }
            init();

            function login (user) {
                var user = UserService.findUserByCredentials(user.username, user.password);
                if (user){
                    $location.url("user/" + user._id);
                } else{
                    vm.alert = "User not found";
                }
            }

            function register() {
                $location.url("/register");
            }
        }
    })();



