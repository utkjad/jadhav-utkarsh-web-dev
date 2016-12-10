(function () {

    angular
        .module('MRApp')
        .controller('MainController', MainController);

    function MainController($state, $rootScope) {
        function init() {
            $rootScope.$on('$viewContentLoading',
                function (event, viewConfig) {
                    $rootScope.isToggleMenuVisible = $state.includes("profile");
                });

            $rootScope.$on('$stateChangeSuccess', function () {
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
            });
        }
        init();
    }

})();