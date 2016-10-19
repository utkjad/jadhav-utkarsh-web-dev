(function () {
        angular
            .module("WebAppMaker")
            .factory("WidgetService", WidgetService);

        function WidgetService() {
            var widgets = [
                { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
                { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                    "url": "http://lorempixel.com/400/200/"},
                { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
                { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
                { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                    "url": "https://youtu.be/AM2Ivdi9c4E" },
                { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
            ];

            var api  = {
                createWidget: createWidget,
                findWidgetsByPageId: findWidgetsByPageId,
                findWidgetById:findWidgetById,
                updateWidget: updateWidget,
                deleteWidget:deleteWidget
            };
            return api;

            function createWidget(pageId, widget) {
                var newWidget = {
                    _id : (new Date()).getTime() + "",
                    widgetType: widget.widgetType,
                    pageId: pageId,
                    size: widget.size,
                    text: widget.text
                };
                widgets.push(newWidget);
            }


            function findWidgetsByPageId(pid) {
                var result = [];
                for(var widget in widgets){
                    if(widgets[widget].pageId == parseInt(pid)){
                        result.push(widgets[widget]);
                    }
                }
                return result;
            }

            function findWidgetById(widgetId) {
                for (var u in widgets){
                    widget = widgets[u];
                    if (widget._id ===  parseInt(widgetId)){
                        return widget;
                    }
                }
                return null;
            }

            function updateWidget(widgetId, widget) {
                for (var w in widgets){
                    currWidget = widgets[w];
                    if (currWidget._id ===  parseInt(widgetId)){
                        currWidget.widgetType = widget.widgetType;
                        currWidget.pageId = widget.pageId;
                        currWidget.size = widget.size;
                        currWidget.text = widget.text;
                        return true;
                    }
                    return false;
                }
            }

            function deleteWidget(widgetId) {
                for (var i in users){
                    widget = widgets[i];
                    if (widget._id ===  parseInt(widgetId)){
                        widgets.splice(i, 1);
                    }
                }
                return null;
            }
        }
    }
)();