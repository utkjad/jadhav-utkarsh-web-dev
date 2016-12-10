module.exports = function (mongoose) {

    var WidgetSchema = require('./widget.schema.server')(mongoose);
    var Widget = mongoose.model('Widget', WidgetSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        reorderWidget: reorderWidget,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget
    };
    return api;

    function createWidget(pageId, widget) {
        widget._page = pageId;
        widget.size = 1;
        widget.width = "100%";
        return Widget
            .find({_page: pageId})
            .then(function (widgets) {
                // starts with 0 and ....
                widget.index = widgets.length;
                return Widget.create(widget);
            });
    }

    function findAllWidgetsForPage(pageId) {
        return Widget.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return Widget.findById(widgetId);
    }

    function reorderWidget(pageId, start, end) {
        start = parseInt(start);
        end = parseInt(end);

        return Widget
            .find({_page: pageId},
                function (err, widgets) {
                    widgets.forEach(function (widget) {
                        if (start > end) {
                            if (widget.index >= end && widget.index < start) {
                                widget.index++;
                                widget.save(function () {});
                            } else if (widget.index === start) {
                                widget.index = end;
                                widget.save(function () {});
                            }
                        } else {
                            if (widget.index <= end && widget.index > start) {
                                widget.index--;
                                widget.save(function() {});
                            } else if (widget.index === start) {
                                widget.index = end;
                                widget.save(function() {});
                            }
                        }
                    });
                });
    }

    function updateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update({_id: widgetId}, {$set: widget});
    }

    function deleteWidget(widgetId) {
        return Widget
            .findOne({_id: widgetId},
                function (err, widget) {
                    var index = widget.index;
                    var pageId = widget._page;

                    Widget
                        .find({_page: pageId},
                            function (err, widgets) {
                                widgets.forEach(function (widget) {
                                    if (widget.index > index) {
                                        widget.index--;
                                        widget.save(function() {});
                                    } else if (widget.index === index) {
                                        widget.remove();
                                    }
                                })
                            });
                });
    }

};