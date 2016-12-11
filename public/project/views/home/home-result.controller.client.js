(function () {

    angular
        .module('MRApp')
        .controller('HomeResultController', HomeResultController);

    function HomeResultController($stateParams, $scope, MovieService) {

        var vm = this;
        vm.movieTitle = $stateParams.movieTitle;
        vm.pagingFunctionNext = pagingFunctionNext;
        vm.pagingFunctionPrevious = pagingFunctionPrevious;

        function init() {
            vm.pagenumber = 1;
            if (vm.movieTitle) {
                getMoviesByTitle();
            }
        }
        init();

        function getMoviesByTitle() {
            MovieService
                .getMoviesByTitle(vm.movieTitle, vm.pagenumber)
                .then(function (response) {
                    var movies = $scope.homeControllerModel.preprocess(response.data);
                    if (movies.length != 0) {
                        vm.movies = movies;
                        vm.alert = "";
                    } else {
                        vm.alert = "Something terrible happened!";
                    }
                }, function (err) {
                    vm.alert = "Something terrible happened!";
                });
        }

        function pagingFunctionNext() {
            vm.pagenumber++;
            MovieService
                .findPopularMovies(vm.pagenumber)
                .then(function (response) {
                    var movies = $scope.homeControllerModel.preprocess(response.data);
                    if (movies.length != 0) {
                        vm.movies = movies;
                    }
                });
        }

        function pagingFunctionPrevious() {
            if (vm.pagenumber === 1){

            }
            else{
                vm.pagenumber--;
            }
            MovieService
                .findPopularMovies(vm.pagenumber)
                .then(function (response) {
                    var movies = $scope.homeControllerModel.preprocess(response.data);
                    if (movies.length != 0) {
                        vm.movies = movies;
                    }
                });
        }

    }

})();