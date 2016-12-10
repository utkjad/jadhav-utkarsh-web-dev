(function () {

    angular
        .module('MRApp')
        .controller('HeaderController', HeaderController);

    function HeaderController($state, UserService) {

        var vm = this;

        vm.toggleMenu = toggleMenu;
        vm.logout = logout;
        vm.home = home;

        function init() {

        }

        init();

        function toggleMenu() {
            $("#wrapper").toggleClass("toggled");
        }

        function logout() {
            UserService
                .logout()
                .then(function () {
                    UserService.setCurrentUser(null);
                    $state.go("home");
                });
        }

        function home() {
            $state.go("home");
        }

    }

})();