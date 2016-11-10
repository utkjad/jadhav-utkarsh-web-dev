module.exports = function (app) {
    console.log("in widget.service.server.js");

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO", "index": 0},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index": 1},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/", "index": 2},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index": 3},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum", "index": 4},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E", "index": 5},
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>", "index": 6}
    ];

    var multer = require('multer');
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.put("/api/page/:pid/widget", reorderWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);


    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;
        var returnUrl = req.body.returnurl;

        var filename = myFile.filename;
        // var path = myFile.path;
        // var destination = myFile.destination;
        // var size = myFile.size;
        // var mimetype = myFile.mimetype;

        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].url = "/uploads/" + filename;
                widgets[i].width = width;
            }
        }

        res.redirect("/assignment/#" + returnUrl);
    }

    function createWidget(req, res) {
        var pageId = req.params['pid'];
        var widget = req.body;
        var newWidget = {
            "_id": (new Date()).getTime() + "",
            "widgetType": widget.widgetType,
            "pageId": pageId,
            "size": 1,
            "text": "",
            "url": "",
            "width": "100%",
            "index": widgets.length
        };
        widgets.push(newWidget);
        if (newWidget) {
            res.json(newWidget);
            return;
        }
        res.sendStatus(400);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params['pid'];
        var results = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                results.push(widgets[i]);
            }
        }
        if (results) {
            res.json(results);
            return;
        }
        res.sendStatus(404);
    }

    function reorderWidgetsForPage(req, res) {
        var pageId = req.params['pid'];
        var start = parseInt(req.query['start']);
        var end = parseInt(req.query['end']);

        widgets.forEach(function (widget) {
            if (widget.pageId === pageId) {
                if (start > end){
                    if (widget.index >= end && widget.index < start) {
                        widget.index++;
                    } else if (widget.index === start) {
                        widget.index = end;
                    }
                } else {
                    if (widget.index === start) {
                        widget.index = end;
                    } else if (widget.index > start && widget.index <= end) {
                        widget.index--;
                    }
                }
            }
        });
        res.sendStatus(200);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['wgid'];
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params['wgid'];
        var widget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                if (widget.size)
                    widgets[i].size = widget.size;
                if (widget.text)
                    widgets[i].text = widget.text;
                if (widget.url)
                    widgets[i].url = widget.url;
                if (widget.width)
                    widgets[i].width = widget.width;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['wgid'];
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                //reorderWidgetsAfterDelete(widgets[i].pageId, widgets[i].index);
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }
};
