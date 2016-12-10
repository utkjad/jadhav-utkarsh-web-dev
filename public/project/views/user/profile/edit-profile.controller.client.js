(function () {

    angular
        .module('MRApp')
        .controller('EditProfileController', EditProfileController);

    function EditProfileController(UserService) {

        var vm = this;

        vm.update = update;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        vm.updateProfileApi = "/mr/user/" + user._id;
                        UserService
                            .findUserById(vm.user._id)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.currentUser = user;
                                }
                            });
                    }
                });
        }

        init();

        function update(user) {
            UserService
                .updateUser(user)
                .then(function (response) {
                    alert("Profile updated successfully!");
                }, function (err) {
                    alert("err")
                });
        }

    }

})();
