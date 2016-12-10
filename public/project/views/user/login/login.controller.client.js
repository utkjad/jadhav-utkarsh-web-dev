(function () {

    angular
        .module('MRApp')
        .controller('LoginController', LoginController);

    function LoginController($state, UserService) {

        var vm = this;

        vm.login = login;

        function init() {

        }

        init();

        function login(user) {
            if (validate(user)) {
                if (user) {
                    UserService
                        .login(user)
                        .then(function (response) {
                            var resUser = response.data;
                            if (resUser) {
                                UserService.setCurrentUser(resUser);
                                $state.go("profile.edit-profile", {userId: resUser._id});
                            }
                        }, function (err) {
                            vm.error = "Wrong username or password.";
                        });
                }
            } else {
                vm.error = "Please check details and try again";
            }
        }

        function validate(user) {
            var flag = true;

            if (user) {
                flag = flag && user.username;
                flag = flag && user.password;
            } else {
                flag = false;
            }

            return flag;
        }

    }

})();

