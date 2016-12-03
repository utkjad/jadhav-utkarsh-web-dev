(function () {
    angular
        .module("MovieApp")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/search", {
                templateUrl:"views/search/search.view.html",
                controller: "MovieSearchController",
                controllerAs: "model"
            })
            .when("/details/:imdbID", {
                templateUrl:"views/details/details.view.html",
                controller: "MovieDetailsController",
                controllerAs: "model"
            })
    }
})();