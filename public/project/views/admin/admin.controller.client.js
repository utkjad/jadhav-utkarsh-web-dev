(function () {

    angular
        .module('MRApp')
        .controller('AdminController', AdminController);

    function AdminController(UserService) {

        var vm = this;
        vm.predicate = "username";
        vm.reverse = true;

        vm.add = add;
        vm.order = order;
        vm.remove = remove;
        vm.select = select;
        vm.update = update;

        vm.clear = clear;

        function init() {
            vm.selected = -1;
            UserService
                .findAllUsersForAdmin()
                .then(handleSuccess, handleFailure);
        }

        init();

        function add(user) {
            if (user) {
                if (user.username) {
                    UserService
                        .createUserByAdmin(user)
                        .then(handleSuccess, handleFailure);
                } else {
                    vm.error = "Please enter username";
                }
            } else {
                vm.error = "Please enter user details";
            }

        }

        function order(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        }

        function remove(user) {
            UserService
                .deleteUserByAdmin(user._id)
                .then(handleSuccess, handleFailure);
        }

        function select(user) {
            vm.inputUser = angular.copy(user);
            vm.selected = 0;
        }

        function update(user) {
            UserService
                .updateUserByAdmin(user._id, user)
                .then(handleSuccess, handleFailure);
        }

        function handleSuccess(response) {
            vm.success = "User data ready";
            vm.users = response.data;
            vm.inputUser = {};
            vm.selected = -1;
        }

        function handleFailure(err) {
            if (err.status === 409)
                vm.error = "Username taken";
            else
                vm.error = "Unable to create user";
        }

        function clear() {
            vm.error = "";
            vm.success = "";
        }

    }

})();