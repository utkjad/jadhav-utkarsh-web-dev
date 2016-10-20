( function () {
        angular
            .module("WebAppMaker")
            .controller("EditWidgetController",EditWidgetController );

        function EditWidgetController($routeParams, $location, WidgetService) {
            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.widgetId = $routeParams["wgid"];
            vm.back = back;
            vm.updateWidget = updateWidget;
            vm.deleteWidget = deleteWidget;
            vm.profile = profile;
            vm.clear = clear;

            function init() {
                console.log("EditWidgetController loaded");
                vm.widget = WidgetService.findWidgetById(vm.widgetId);
            }
            init();

            function updateWidget(widget) {
                widget = WidgetService.updateWidget(vm.widgetId, widget);
                if (widget) {
                    vm.success = "Widget updated";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                } else {
                    vm.alert = "Unable to update Widget";
                }
            }

            function deleteWidget() {
                var response = WidgetService.deleteWidget(vm.widgetId);
                if (response) {
                    vm.success = "Widget deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                } else {
                    vm.alert = "Unable to delete widget";
                }
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