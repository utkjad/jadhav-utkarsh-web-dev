(function () {
    angular
        .module('Homepage')
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/aboutme", {
                templateUrl: "views/about-me.view.client.html"
            })
            .when("/resume", {
                templateUrl: "views/resume.view.client.html"
            })
            .when("/contact", {
                templateUrl: "views/contact.view.client.html"
            })
            .when("/quotes", {
                templateUrl: "views/quotes.view.client.html"
            })
            // Default case
            .otherwise({
                    redirectTo: '/aboutme'
                }
            );
    }
})();