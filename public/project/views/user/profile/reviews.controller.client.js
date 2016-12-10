(function () {

    angular
        .module('BBBApp')
        .controller('ReviewsController', ReviewsController);

    function ReviewsController($stateParams, UserService, ReviewService) {

        var vm = this;
        vm.navUserId = $stateParams.userId;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return ReviewService.findAllReviewsForUserId(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var reviews = response.data;
                    if (reviews) {
                        vm.reviews = reviews;

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

    }

})();