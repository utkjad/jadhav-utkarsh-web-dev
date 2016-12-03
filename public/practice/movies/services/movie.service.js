(function () {
    angular
        .module("MovieApp")
        .factory("MovieService", MovieService);

    function MovieService($http) {
        var api = {
            "searchMovieByTitle" : searchMovieByTitle,
            "searchMovieByImdbID" : searchMovieByImdbID
        };
        return api;

        function searchMovieByTitle(title) {
            var url = "https://www.omdbapi.com/?s=" + title;
            return $http.get(url);

        }

        function searchMovieByImdbID(imdbid) {
            var url = "https://www.omdbapi.com/?i=" + imdbid;
            return $http.get(url);
        }

    }
})();