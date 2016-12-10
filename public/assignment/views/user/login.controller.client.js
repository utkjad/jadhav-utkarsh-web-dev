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
                var promise = UserService.login(user);
                promise
                    .success(function (user) {
                        if (user != "0") {
                            $location.url("user"); //TODO
                        } else{
                            vm.alert = "No such user found!!!";
                        }
                    })
            }

            function register() {
                $location.url("/register");
            }
        }
    })();



