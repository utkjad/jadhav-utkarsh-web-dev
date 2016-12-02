module.exports = function () {
    console.log("In SERVER models.server.js");

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');

    var userModel = require("./user/user.model.server")();
    var websiteModel = require("./website/website.model.server")();
    var pageModel = require("./page/page.model.server")();
    var widgetModel = require("./widget/widget.model.server")();

    var model = {
        userModel: userModel,
        websiteModel: websiteModel,
        pageModel : pageModel,
        widgetModel : widgetModel
    };
    return model;
};