module.exports = function (app) {
    console.log("In SERVER Assignment/app.js");

    // Every data access points explained here as objects.
    // ORM
    var models = require("./model/models.server")();

    require("./services/user.service.server.js")(app, models);
    require("./services/website.service.server.js")(app, models);
    require("./services/page.service.server.js")(app, models);
    require("./services/widget.service.server.js")(app, models);
};
