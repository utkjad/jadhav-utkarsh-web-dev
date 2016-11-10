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
            }
            init();

            function createWidget(widgetType){
                var widget = {};
                widget.widgetType = widgetType;
                WidgetService
                    .createWidget(vm.pageId, widget)
                    .success(function (widget) {
                        vm.success = "Widget Created";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
                    })
                    .error(function (err) {
                        vm.alert = "Unable to create Widget";
                    })
            }

            function back() {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            }

            function profile() {
                $location.url("/user/" + vm.userId);
            }

            function clear() {
                vm.success = "";
                vm.alert = "";
            }
        }
    }
)();
