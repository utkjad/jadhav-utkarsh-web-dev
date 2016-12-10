module.exports = function (mongoose) {

    var ReviewSchema = require('./review.schema.server')(mongoose);
    var MRReview = mongoose.model('MRReview', ReviewSchema);

    var api = {
        addReview: addReview,
        findAllReviewsForMovieId: findAllReviewsForMovieId,
        findAllReviewsForId: findAllReviewsForId,
        findAllReviewsForUserId: findAllReviewsForUserId,
        FindReviewById: findReviewById,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function addReview(userId, mid, review) {
        review._user = userId;
        review.movieId = mid;
        return MRReview.create(review);
    }

    function findAllReviewsForMovieId(movieId) {
        return MRReview.find({movieId: movieId});
    }

    function findAllReviewsForId(mid) {
        return MRReview.find({movieId: mid});
    }

    function findAllReviewsForUserId(userId) {
        return MRReview.find({_user: userId});
    }

    function findReviewById(reviewId) {
        return MRReview.findById(reviewId);
    }

    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = Date.now();
        return MRReview.update({_id: reviewId}, {$set: review});
    }

    function deleteReview(reviewId) {
        return MRReview.remove({_id: reviewId});
    }

};