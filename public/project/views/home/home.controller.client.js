(function () {

    angular
        .module('MRApp')
        .controller('HomeController', HomeController);

    function HomeController($state, MovieService) {

        var vm = this;
        vm.slides = [];

        vm.slide = slide;
        vm.eventHandler = eventHandler;
        vm.preprocess = preprocess;

        function init() {
            $('#myCarousel').carousel({
                interval: 3500
            });

            var imageUrl = MovieService.getImageUrl();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);

            MovieService
                .getGenreList()
                .then(function (response) {
                    var map = new Object();
                    response.data.genres.forEach(function (element, index, array) {
                        map[element.id] = element.name;
                    });
                    vm.genreList = map;
                });

            MovieService
                .findUpcomingMovies()
                .then(function (response) {
                    response.data.results.forEach(function (element1, index1, array1) {
                        if (element1.backdrop_path) {
                            element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                            vm.slides.push(element1);
                        }
                    });
                });
        }
        init();

        function slide(dir) {
            $('#myCarousel').carousel(dir);
        }

        function preprocess(data) {
            var result = [];
            data.results.forEach(function (element1, index1, array1) {
                var genres = [];
                if (element1.genre_ids.length != 0 && element1.genre_ids) {
                    element1.genre_ids.forEach(function (element2, index2, array2) {
                        try {
                            var genreName = getValue(element2);
                            genres.push("#" + genreName);
                        }
                        catch (err) {

                        }
                    });
                }
                else {
                    genres.push("#NA");
                }
                element1.genres = genres;

                if (element1.backdrop_path) {
                    element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                }
                else {
                    element1.imageUrl = "/project/client/images/image-not-available.jpg";
                }

                if (!element1.overview) {
                    element1.overview = "There is no overview for this movie.";
                }

                if (element1.imageUrl != "/project/client/images/image-not-available.jpg") {
                    result.push(element1);
                }
            });

            return result;
        }

        function getValue(key) {
            return vm.genreList[key];
        }

        function eventHandler(event, movieTitle) {
            if (movieTitle !== "") {
                if (event.keyCode === 13) {
                    $state.go("home.result", {movieTitle: movieTitle});
                }
            }
        }

    }

})();