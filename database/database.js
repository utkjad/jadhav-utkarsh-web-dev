module.exports = function (mongoose) {
    console.log("In database.js");
    var connectionString = 'mongodb://127.0.0.1:27017/test';

    if (process.env.WEB_CONCURRENCY) {
        connectionString = process.env.MONGODB_URI;
    }

    mongoose.connect(connectionString);

    var assignmentModels = require('../assignment/model/models.server')(mongoose);
    var projectModels = require('../project/model/models.server')(mongoose);

    var api = {
        wamModels: wamModels,
        MRModels: MRModels
    };
    return api;

    function wamModels() {
        return assignmentModels;
    }

    function MRModels() {
        return projectModels;
    }

};