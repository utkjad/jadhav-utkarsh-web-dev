module.exports = function (app) {
    console.log("in website.service.server.js");

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
    ];


    app.post('/api/user/:uid/website', createWebsite);
    app.get('/api/user/:uid/website', findAllWebsitesForUser);
    app.get('/api/website/:wid',findWebsiteById);
    app.put('/api/website/:wid',updateWebsite);
    app.delete('/api/website/:wid',deleteWebsite);

    function deleteWebsite(req, res) {
        var websiteId = req.params['wid'];
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i,1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['wid'];
        var website = req.body;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
    function findWebsiteById(req, res) {
        var websiteId = parseInt(req.params.wid);
        for(var website in websites){
            if(parseInt(websites[website]._id) === websiteId){
                res.json(websites[website]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = parseInt(req.params.uid);
        var results = [];
        for(var website in websites){
            if(parseInt(websites[website].developerId) === userId){
                results.push(websites[website]);
            }
        }
        if (results) {
            res.json(results);
            return;
        }
        res.sendStatus(404);
    }
    
    
    function createWebsite(req, res) {
        var website = req.body;
        var userId = req.params.uid;

        var newWebsite = {
            "_id": (new Date()).getTime() + "",
            "name": website.name,
            "description": website.description,
            "developerId": userId
        }

        websites.push(newWebsite);
        if (newWebsite) {
            res.json(newWebsite);
            return;
        }
        res.sendStatus(400);
    }
};