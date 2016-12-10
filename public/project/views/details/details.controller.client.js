(function () {

    angular
        .module('MRApp')
        .controller('DetailsController', DetailsController);

    function DetailsController($stateParams, $sce, MovieService, ReviewService, UserService) {

        var vm = this;
        vm.movieId = $stateParams.movieId;

        vm.addReview = addReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;
        vm.deleteReview = deleteReview;
        vm.cancelReview = cancelReview;
        vm.likeMovie = likeMovie;
        vm.unlikeMovie = unlikeMovie;
        vm.clear = clear;

        function init() {
            $('[data-toggle="tooltip"]').tooltip();

            vm.review = {
                "rating": 0,
                "title": "",
                "description": ""
            };

            var imageUrl = MovieService.getImageUrl();
            vm.imageUrl = imageUrl.substring(0, imageUrl.length - 1);

            UserService
                .getCurrentUser()
                .then(function (response) {
                    var user = response.data;
                    if (user) {
                        vm.user = user;
                        UserService
                            .findUserById(vm.user._id)
                            .then(function (response) {
                                if (response.data) {
                                    vm.user = response.data;
                                }
                            });
                    }
                });


            MovieService
                .findSimilarMovies(vm.movieId)
                .then(function (response) {
                    var similar = [];
                    response.data.results.forEach(function (element1, index1, array1) {
                        if (element1.backdrop_path) {
                            element1.imageUrl = vm.imageUrl + element1.backdrop_path;
                            similar.push(element1);
                        }
                    });
                    vm.similar = similar;
                });

            MovieService
                .getMovieCredits(vm.movieId)
                .then(function (response) {
                    var cast = [];
                    response.data.cast.forEach(function (element1, index1, array1) {
                        if (element1.profile_path && element1.name && element1.character) {
                            element1.imageUrl = vm.imageUrl + element1.profile_path;
                            cast.push(element1);
                        }
                    });
                    vm.cast = cast;
                });

            MovieService
                .getVideoKey(vm.movieId)
                .then(function (response) {
                    var videos = response.data.results;
                    videos.forEach(function (element, index, array) {
                        element.url = $sce.trustAsResourceUrl(MovieService.getYoutubeEmbed(element.key));
                    });
                    vm.videos = videos;
                });

            movieDetailsForMovieId();
        }

        if (vm.movieId) {
            init();
        }

        function movieAvgRatingByMovieId() {
            var avgRating = 0;
            for (var i = 0; i < vm.reviews.length; i++) {
                avgRating += parseInt(vm.reviews[i].rating);
            }
            vm.avgRating = (avgRating / vm.reviews.length);
            if (isNaN(vm.avgRating)) {
                vm.avgRating = 0;
            }
        }

        function movieDetailsForMovieId() {
            MovieService
                .getMovieDetailsById(vm.movieId)
                .then(function (response) {
                    var movie = response.data;
                    if (movie.backdrop_path) {
                        movie.imageUrl = vm.imageUrl + movie.backdrop_path;
                    }
                    else {
                        movie.imageUrl = "/project/images/image-not-available.png";
                    }

                    vm.movie = movie;
                    console.log(movie);
                    findAllReviewsForMovieId();
                });
        }

        function findAllReviewsForMovieId() {
            ReviewService
                .findAllReviewsForMovieId(vm.movieId)
                .then(function (response) {
                    if (response.data) {
                        vm.reviews = response.data;
                        findUserByReviewUserId();
                        movieAvgRatingByMovieId();
                        isLiked();
                    }
                });
        }

        function addReview(review) {
            vm.movie.imageUrl = vm.imageUrl + vm.movie.backdrop_path;
            ReviewService
                .addReview(vm.user._id, vm.movieId, review)
                .then(function (response) {
                    if (response.data) {
                        // vm.success = "Review added!";
                        vm.selectedIndex = -1;
                        vm.review = {};
                        vm.reviews.push(response.data);
                        findUserByReviewUserId();
                        movieAvgRatingByMovieId();
                        return MovieService.addMovie(vm.movie);
                    }
                }, function (err) {
                    // vm.alert = err;
                })
                .then(function (response) {
                    console.log("success!");
                }, function (err) {
                    console.log(err);
                });
        }

        function selectReview(index) {
            vm.selectedIndex = index;
            var editReview = {
                "_id": vm.reviews[index]["_id"],
                "title": vm.reviews[index]["title"],
                "description": vm.reviews[index]["description"],
                "timestamp": vm.reviews[index]["timestamp"],
                "movieId": vm.reviews[index]["movieId"],
                "_user": vm.reviews[index]["_user"],
                "rating": vm.reviews[index]["rating"]
            };
            vm.editReview = editReview;
        }

        function updateReview(review) {
            ReviewService
                .updateReview(review._id, review)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    // vm.success = "Review updated!";
                    vm.reviews[vm.selectedIndex] = review;
                    vm.selectedIndex = -1;
                    vm.review = {};
                    findUserByReviewUserId();
                    movieAvgRatingByMovieId();
                }, function (err) {
                    // vm.alert = err;
                });
        }

        function deleteReview(index) {
            var reviewId = vm.reviews[index]._id;
            ReviewService
                .deleteReview(reviewId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    // vm.success = "Review deleted!";
                    vm.reviews.splice(index, 1);
                    vm.selectedIndex = -1;
                    vm.review = {};
                    findUserByReviewUserId();
                    movieAvgRatingByMovieId();
                }, function (err) {
                    // vm.alert = err;
                });
        }

        function cancelReview() {
            vm.selectedIndex = -1;
        }

        function findUserByReviewUserId() {
            vm.reviews.forEach(function (element, index, array) {
                UserService.findUserById(vm.reviews[index]._user)
                    .then(function (response) {
                        if (response.data) {
                            vm.reviews[index].userFirstName = response.data.firstName;
                            vm.reviews[index].imgUrl = response.data.imgUrl;
                        }
                    });
            });
        }

        function likeMovie() {
            vm.movie.imageUrl = vm.imageUrl + vm.movie.backdrop_path;
            UserService
                .like(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    // vm.success = "Movie Liked";
                    vm.isLiked = true;
                    return MovieService.addMovie(vm.movie);
                }, function (err) {
                    // vm.alert = err;
                })
                .then(function (response) {
                    console.log("success!");
                }, function (err) {
                    console.log(err);
                });
        }

        function unlikeMovie() {
            UserService
                .unlike(vm.user._id, vm.movieId)
                .then(function (response) {
                    var status = response.data;
                    console.log(status);
                    // vm.success = "Movie unliked";
                    vm.isLiked = false;
                }, function (err) {
                    // vm.alert = err;
                });
        }

        function isLiked() {
            if (vm.user) {
                vm.isLiked = (vm.user.movieLikes.indexOf(vm.movieId) > -1);
            } else {
                vm.isLiked = false;
            }
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }

    }

})();