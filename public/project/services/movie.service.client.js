// ANGULAR SERVICES FOR MOVIES

(function () {

    angular
        .module('MRApp')
        .factory('MovieService', MovieService);

    function MovieService($http) {

        // Useful for URLs.
        var baseUrl = "/mr/movie";
        var getImage = "http://image.tmdb.org/t/p/original/";
        var youtubeEmbed = "https://www.youtube.com/embed/KEY";

        var api = {
            getGenreList: getGenreList,
            getImageUrl: getImageUrl,
            getMovieCredits: getMovieCredits,
            getMovieDetailsById: getMovieDetailsById,
            getMoviesByTitle: getMoviesByTitle,
            getVideoKey: getVideoKey,
            getYoutubeEmbed: getYoutubeEmbed,
            addMovie: addMovie,
            findPopularMovies: findPopularMovies,
            findSimilarMovies: findSimilarMovies,
            findTopMovies: findTopMovies,
            findUpcomingMovies: findUpcomingMovies
        };
        return api;

        function addMovie(movie) {
            return $http.post(baseUrl, movie);
        }

        function findPopularMovies(page) {
            var url = baseUrl + "/popular/" + page;
            return $http.get(url);
        }

        function findSimilarMovies(movieId) {
            var url = baseUrl + "/similar/" + movieId;
            return $http.get(url);
        }

        function findTopMovies() {
            var url = baseUrl + "/top";
            return $http.get(url);
        }

        function findUpcomingMovies() {
            var url = baseUrl + "/upcoming";
            return $http.get(url);
        }

        function getGenreList() {
            var url = baseUrl + "/genres";
            return $http.get(url);
        }

        function getImageUrl() {
            return getImage;
        }

        function getMovieCredits(movieId) {
            var url = baseUrl + "/credits/" + movieId;
            return $http.get(url);
        }

        function getMovieDetailsById(movieId) {
            var url = baseUrl + "/details/" + movieId;
            return $http.get(url);
        }

        function getMoviesByTitle(movieTitle, page) {
            var url = baseUrl + "/search/" + movieTitle + "/page/" + page;
            return $http.get(url);
        }

        function getVideoKey(movieId) {
            var url = baseUrl + "/video/" + movieId;
            return $http.get(url);
        }

        function getYoutubeEmbed(key) {
            var url = youtubeEmbed.replace("KEY", key);
            return url;
        }

    }

})();
