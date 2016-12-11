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
                if (user.username && user.password){


                UserService
                    .login(user)
                    .success(function (user) {
                        if (user != "0") {
                            $location.url("user"); //TODO
                        } else{
                            vm.alert = "No such user found!!!";
                        }
                    })
                    .error(function (user)  {
                        vm.alert = "cannot find the user"
                    })
                }
                else {
                    if (!user.username){
                        vm.alert = "Username cannot be empty"
                    }
                    else{
                        vm.alert = "passowrd cannot be empty!"
                    }
                }
            }

            function register() {
                $location.url("/register");
            }
        }
    })();



