module.exports = function (mongoose) {
    console.log("In SERVER page.model.server.js");

    var PageSchema = require('./page.schema.server')(mongoose);
    var PageModel = mongoose.model("PageModel", PageSchema);
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        console.log("page created");
        return PageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel
            .find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel
            .findById(pageId);
    }

    function updatePage(pageId, page) {
        delete page._id;
        return PageModel
            .update({_id: pageId}, {$set: page});
    }

    function deletePage(pageId) {
        return PageModel
            .remove({_id: pageId});
    }

};