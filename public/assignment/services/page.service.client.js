( function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page){
            var newPage = {
                _id : (new Date()).getTime() + "",
                name: page.name,
                websiteId: websiteId,
                description: page.description,
            }
            pages.push(newPage);
            return newPage;
        }

        function findPagesByWebsiteId(websiteId) {
            var result = []
            for (page in pages){
                if (pages[page].websiteId === websiteId) {
                    result.push(pages[page]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for (page in pages){
                if (pages[page]._id === pageId) {
                    return pages[page];
                }
            }
            return null;
        }

        function updatePage(pageId, page) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages[i].name = page.name;
                    pages[i].title = page.title;
                    return true;
                }
            }
            return false;
        }

        function deletePage(pageId) {
            for (var i in pages) {
                if (pages[i]._id === pageId) {
                    pages.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();
