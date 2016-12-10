module.exports = function (app, models) {

    var movieModel = models.movieModel;
    var reviewModel = models.reviewModel;

    var q = require('q');

    app.post('/mr/user/:uid/movie/:mid', addReview);
    app.get('/mr/movie/:mid/reviews', findAllReviewsForMovieId);
    app.get('/mr/user/:uid/reviews', findAllReviewsForUserId);
    app.put('/mr/review/:rid', updateReview);
    app.delete('/mr/review/:rid', deleteReview);

    function addReview(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        var review = req.body;
        reviewModel
            .addReview(userId, mid, review)
            .then(function (review) {
                res.json(review);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllReviewsForMovieId(req, res) {
        var mid = req.params['mid'];
        reviewModel
            .findAllReviewsForMovieId(mid)
            .then(function (reviews) {
                res.json(reviews);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllReviewsForUserId(req, res) {
        var userId = req.params['uid'];
        reviewModel
            .findAllReviewsForUserId(userId)
            .then(function (reviews) {
                var promiseArray = [];
                var result = [];
                reviews.forEach(function (review, index, array) {
                    promiseArray
                        .push(movieModel
                            .findMovieByMovieId(review.movieId)
                            .then(function (movie) {
                                if (movie) {
                                    var jsonString = JSON.stringify(review);
                                    var jsonStringNew = jsonString;
                                    var newReview = JSON.parse(jsonStringNew);
                                    newReview.movie = movie;
                                    result.push(newReview);
                                }
                            }, function (err) {
                                console.log(err);
                            }));
                });
                q.all(promiseArray)
                    .then(function () {
                        res.json(result);
                    });
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateReview(req, res) {
        var reviewId = req.params['rid'];
        var review = req.body;
        reviewModel
            .updateReview(reviewId, review)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }

    function deleteReview(req, res) {
        var reviewId = req.params['rid'];
        reviewModel
            .deleteReview(reviewId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.sendStatus(400);
            });
    }

};