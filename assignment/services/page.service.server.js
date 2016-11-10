module.exports = function (app) {
    console.log("in page.service.server.js");

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    function createPage(req, res) {
        var websiteId = req.params['wid'];
        var page = req.body;
        var newPage = {
            "_id": (new Date()).getTime() + "",
            "name": page.name,
            "title": page.title,
            "websiteId": websiteId
        };
        pages.push(newPage);
        if (newPage) {
            res.json(newPage);
            return;
        }
        res.sendStatus(400);
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['wid'];
        var results = [];
        for (var i in pages) {
            if (pages[i].websiteId === websiteId) {
                results.push(pages[i]);
            }
        }
        if (results) {
            res.json(results);
            return;
        }
        res.sendStatus(404);
    }

    function findPageById(req, res) {
        var pageId = req.params['pid'];
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                res.json(pages[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updatePage(req, res) {
        var pageId = req.params['pid'];
        var page = req.body;
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages[i].name = page.name;
                pages[i].title = page.title;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deletePage(req, res) {
        var pageId = req.params['pid'];
        for (var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};