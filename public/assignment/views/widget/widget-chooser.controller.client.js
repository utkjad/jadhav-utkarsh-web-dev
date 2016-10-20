( function () {
        angular
            .module("WebAppMaker")
            .controller("NewWidgetController",NewWidgetController );

        function NewWidgetController($routeParams, $location, WidgetService) {
            var vm = this;
            vm.pid = $routeParams.pid;
            vm.profile = profile;
            vm.back = back;
            vm.createWidget = createWidget;
            vm.clear = clear;

            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];

            function init() {
                console.log("NewWidgetController loaded");
                // vm.widgets = WidgetService.findWidgetForPage(vm.pid);
            }
            init();
            
            function back() {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }
            function profile() {
                $location.url("/user/" + vm.userId);
            }
            function createWidget(widgetType){
                var widget = {};
                widget.widgetType = widgetType;
                widget = WidgetService.createWidget(vm.pageId, widget);
                if (widget) {
                    vm.success = "Widget Created";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                } else {
                    vm.alert = "Unable to create Widget";
                }
            }
            function clear() {
                vm.success = "";
                vm.alert = "";
            }
        }
    }
)();
