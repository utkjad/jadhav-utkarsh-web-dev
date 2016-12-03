(function () {
    angular
        .module("MovieApp")
        .controller("MovieDetailsController", MovieDetailsController);

    function MovieDetailsController($routeParams, MovieService) {
        var vm = this;
        var imdbID = $routeParams.imdbID;
        console.log("In MovieDetailsController" + imdbID);

        function init(){
            MovieService
                .searchMovieByImdbID(imdbID)
                .success(function (result) {
                    vm.movie = result;
                })
        }
        init();

    }
})();