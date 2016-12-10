(function () {

    angular
        .module('MRApp')
        .controller('HomeResultController', HomeResultController);

    function HomeResultController($stateParams, $scope, MovieService) {

        var vm = this;
        vm.movieTitle = $stateParams.movieTitle;

        vm.pagingFunction = pagingFunction;

        function init() {
            vm.pagination = 1;

            if (vm.movieTitle) {
                getMoviesByTitle();
            }
        }
        init();

        function getMoviesByTitle() {
            MovieService
                .getMoviesByTitle(vm.movieTitle, vm.pagination)
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

        function pagingFunction() {
            if (vm.pagination === 1) {
                vm.pagination++;
            } else {
                vm.busy = true;
                MovieService
                    .getMoviesByTitle(vm.movieTitle, vm.pagination)
                    .then(function (response) {
                        var movies = $scope.homeControllerModel.preprocess(response.data);
                        if (movies.length != 0) {
                            vm.movies.push.apply(vm.movies, movies);
                            vm.busy = false;
                        }
                    });
                vm.pagination++;
            }
        }

    }

})();