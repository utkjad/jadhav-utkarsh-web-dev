module.exports = function (app, model) {
    console.log("In SERVER page.service.server.js");

    app.post('/api/website/:wid/page', createPage);
    app.get('/api/website/:wid/page', findAllPagesForWebsite);
    app.get('/api/page/:pid', findPageById);
    app.put('/api/page/:pid', updatePage);
    app.delete('/api/page/:pid', deletePage);

    function createPage(req, res) {
        var websiteId = req.params.wid;
        var page = req.body;
        model
            .pageModel
            .createPage(websiteId, page)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.status(400).send(error);
            });
    }

    function findAllPagesForWebsite(req, res) {
        var websiteId = req.params['wid'];
        model
            .pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params['pid'];
        model
            .pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params['pid'];
        var page = req.body;
        model
            .pageModel
            .updatePage(pageId, page)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params['pid'];
        model
            .pageModel
            .deletePage(pageId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }


};