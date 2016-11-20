module.exports = function (app) {
    console.log("In Assignment/app.js");
    require("./services/user.service.server.js")(app);
    require("./services/website.service.server.js")(app);
    require("./services/page.service.server.js")(app);
    require("./services/widget.service.server.js")(app);

    // require("./model/models.server")();
};
