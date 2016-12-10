module.exports = function (mongoose) {
    console.log("In SERVER website.model.server.js");
    var WebsiteSchema = require("./website.schema.server")(mongoose);
    var WebsiteModel = mongoose.model("WebsiteModel", WebsiteSchema);


    var api = {
        createWebsiteForUser : createWebsiteForUser,
        findAllWebsitesForUser : findAllWebsitesForUser,
        findWebsiteById : findWebsiteById,
        updateWebsite : updateWebsite,
        deleteWebsite : deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        return WebsiteModel.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return WebsiteModel.find({_user: userId});
    }

    function findWebsiteById(websiteId) {
        return WebsiteModel.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        delete website._id;
        return WebsiteModel.update({_id: websiteId}, {$set: website});
    }

    function deleteWebsite(websiteId) {
        return WebsiteModel.remove({_id: websiteId});
    }
}