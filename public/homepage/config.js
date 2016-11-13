(function () {
    angular
        .module('Homepage')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/aboutme", {
                templateUrl: "views/about-me.view.client.html"
            })
    }
})();