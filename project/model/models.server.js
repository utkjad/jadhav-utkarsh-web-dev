module.exports = function (mongoose) {

    var models = {
        userModel: require('./user/user.model.server')(mongoose),
        movieModel: require('./movie/movie.model.server')(mongoose),
        reviewModel: require('./review/review.model.server')(mongoose)
    };
    return models;

};