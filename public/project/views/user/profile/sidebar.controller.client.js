(function () {

    angular
        .module('MRApp')
        .controller('SidebarController', SidebarController);

    function SidebarController($stateParams, UserService) {

        var vm = this;
        vm.navUserId = $stateParams.userId;

        vm.follow = follow;
        vm.unfollow = unfollow;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;

                        isAlreadyFollowing();

                        UserService
                            .findUserById(vm.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navUser = user;
                                }
                            });
                    }
                });
        }

        init();

        function isAlreadyFollowing() {
            vm.alreadyFollowing = (vm.user.following.indexOf(vm.navUserId) > -1);
        }

        function follow() {
            UserService
                .follow(vm.user._id, vm.navUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.alreadyFollowing = true;
                }, function (err) {
                    console.log(err);
                    vm.alreadyFollowing = false;
                });
        }

        function unfollow() {
            UserService
                .unfollow(vm.user._id, vm.navUserId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.alreadyFollowing = false;
                }, function (err) {
                    console.log(err);
                    vm.alreadyFollowing = true;
                });
        }

    }

})();