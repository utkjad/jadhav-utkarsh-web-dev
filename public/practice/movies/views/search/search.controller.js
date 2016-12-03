(function () {
    console.log("search.controller.js");
    angular
        .module("MovieApp")
        .controller("MovieSearchController", MovieSearchController);

    function MovieSearchController(MovieService) {
        console.log("In MovieSearchController");
        var vm = this;
        vm.searchMovieByTitle = searchMovieByTitle;

        function searchMovieByTitle(title){
            MovieService
                .searchMovieByTitle(title)
                .success(function (result) {
                    vm.movies = result.Search;
                });
        }

    }
})();