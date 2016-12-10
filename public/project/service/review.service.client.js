(function () {

    angular
        .module('MRApp')
        .factory('ReviewService', ReviewService);

    function ReviewService($http) {

        var api = {
            addReview: addReview,
            deleteReview: deleteReview,
            findAllReviewsForMovieId: findAllReviewsForMovieId,
            findAllReviewsForUserId: findAllReviewsForUserId,
            updateReview: updateReview
        };
        return api;

        function addReview(userId, movieId, review) {
            var url = "/mr/user/" + userId + "/movie/" + movieId;
            return $http.post(url, review);
        }

        function deleteReview(reviewId) {
            var url = "/mr/review/" + reviewId;
            return $http.delete(url);
        }

        function findAllReviewsForMovieId(movieId) {
            var url = "/mr/movie/" + movieId + "/reviews";
            return $http.get(url);
        }

        function findAllReviewsForUserId(userId) {
            var url = "/mr/user/" + userId + "/reviews";
            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/mr/review/" + reviewId;
            return $http.put(url, review);
        }

    }

})();