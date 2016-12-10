module.exports = function (app, database, security) {
    console.log("In SERVER Assignment/app.js");

    var models = database.wamModels();

    require("./services/user.service.server.js")(app, models, security);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
};
