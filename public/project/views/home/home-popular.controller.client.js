(function () {

    angular
        .module('MRApp')
        .controller('HomePopularController', HomePopularController);

    function HomePopularController($scope, MovieService) {

        var vm = this;

        vm.pagingFunction = pagingFunction;

        function init() {
            vm.pagination = 1;
            MovieService
                .findPopularMovies(vm.pagination)
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
        init();

        function pagingFunction() {
            if (vm.pagination === 1) {
                vm.pagination++;
            } else {
                vm.busy = true;
                MovieService
                    .findPopularMovies(vm.pagination)
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