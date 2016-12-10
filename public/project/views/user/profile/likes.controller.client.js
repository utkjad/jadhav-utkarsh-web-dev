(function () {

    angular
        .module('BBBApp')
        .controller('LikesController', LikesController);

    function LikesController($q, $stateParams, UserService, MovieService) {

        var vm = this;
        vm.navUserId = $stateParams.userId;

        vm.like = like;
        vm.unlike = unlike;

        function init() {
            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        return UserService.findAllLikedMovies(vm.navUserId);
                    }
                })
                .then(function (response) {
                    var movies = response.data;
                    if (movies) {

                        isMovieLiked(movies);

                        UserService
                            .findUserById(vm.navUserId)
                            .then(function (response) {
                                var user = response.data;
                                if (user) {
                                    vm.navUser = user;
                                }
                            });
                    }
                });
        }

        init();

        function isMovieLiked(movies) {

            movies.forEach(function (movie, index, array) {
                movie.isLiked = (vm.user.movieLikes.indexOf(movie.movieId) > -1);
            });

            vm.movies = movies;

        }

        function like(index) {
            var movieId = vm.movies[index].movieId;
            UserService
                .like(vm.user._id, movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.movies[index].isLiked = true;
                });
        }

        function unlike(index) {
            var movieId = vm.movies[index].movieId;
            UserService
                .unlike(vm.user._id, movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    vm.movies[index].isLiked = false;
                });
        }

    }

})();