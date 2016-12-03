module.exports = function () {
    console.log("In SERVER models.server.js");

    var connectionString = 'mongodb://127.0.0.1:27017/test';


    // if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    //     connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
    //         process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
    //         process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
    //         process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
    //         process.env.OPENSHIFT_APP_NAME;
    // }

    if(process.env.WEB_CONCURRENCY){
        connectionString = process.env.MONGODB_URI;
    }
    var mongoose = require('mongoose');
    mongoose.connect(connectionString);
    // 'mongodb://localhost/wam-fall-2016');

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