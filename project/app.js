module.exports = function (app, database, security) {
    console.log("PROJECT SERVER APP INITIALIZER");
    var models = database.MRModels();
    require('./services/user.service.server')(app, models, security);
    require('./services/movie.service.server')(app, models);
    require('./services/review.service.server')(app, models);
};