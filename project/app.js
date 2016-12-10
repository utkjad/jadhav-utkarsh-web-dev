module.exports = function (app, database, security) {
    console.log("PROJECT SERVER APP INITIALIZER and proxy");

    require("./proxy/proxy.movie.service.server")(app);

    var models = database.MRModels();
    require('./services/user.service.server')(app, models, security);
    require('./services/movie.service.server')(app, models);
    require('./services/review.service.server')(app, models);
};