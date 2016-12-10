module.exports = function (mongoose) {
    console.log("In SERVER models.server.js");

    var userModel = require("./user/user.model.server")(mongoose);
    var websiteModel = require("./website/website.model.server")(mongoose);
    var pageModel = require("./page/page.model.server")(mongoose);
    var widgetModel = require("./widget/widget.model.server")(mongoose);

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel : pageModel,
        widgetModel : widgetModel
    };
    return model;
};