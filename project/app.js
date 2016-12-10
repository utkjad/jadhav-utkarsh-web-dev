module.exports = function (app, database, security) {
    console.log("IN PROJECT> MRApp initialized");
    var models = database.bbbModels();
    require('./services/user.service.server')(app, models);
    require('./services/movie.service.server')(app, models);
    require('./services/review.service.server')(app, models);
};