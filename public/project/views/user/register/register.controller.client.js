(function () {

    angular
        .module('BBBApp')
        .controller('RegisterController', RegisterController);

    function RegisterController($state, UserService) {

        var vm = this;

        vm.register = register;

        function init() {

        }

        init();

        function register(user) {
            if (validate(user)) {
                UserService
                    .register(user)
                    .then(function (response) {
                        var resUser = response.data;
                        if (resUser) {
                            redirectToProfile(resUser);
                        }
                    }, function (error) {
                        if (error.status === 409)
                            vm.error = "Username taken";
                        else
                            vm.error = "Unable to create user";
                    });
            } else {
                vm.error = "Please fill all details";
            }
        }

        function redirectToProfile(user) {
            if (user) {
                UserService.setCurrentUser(user);
                $state.go("profile.edit-profile", {userId: user._id});
            }
        }

        function validate(user) {
            var flag = true;

            if (user) {
                flag = flag && user.username;
                flag = flag && user.password;
                flag = flag && user.firstName;
                flag = flag && user.lastName;
                flag = flag && user.email;

                if (user.password == user.verifyPassword)
                    flag = flag && true;
                else
                    flag = flag && false;
            }
            else {
                flag = false;
            }

            return flag;

        }

    }

})();

