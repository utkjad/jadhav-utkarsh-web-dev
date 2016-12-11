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
            vm.url = url;

            function init() {
                console.log("EditWidgetController loaded");
                WidgetService
                    .findWidgetById(vm.widgetId)
                    .success(function (widget) {
                        vm.widget = widget;
                    })
                    .error(function (error) {
                        vm.alert = "Unable to find widget";
                    })
            }
            init();

            function url() {
                return "/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.widgetId;
            }

            function updateWidget(widget) {
               if(widget.name){
                   WidgetService
                       .updateWidget(vm.widgetId, widget)
                       .success(function (res) {
                           vm.success = "Widget updated";
                           $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                       })
                       .error(function (err) {
                           vm.alert = "Unable to update Widget";
                       })
               }
               else{
                   vm.alert = "provide name of the widget";
               }
            }

            function deleteWidget() {
                WidgetService
                    .deleteWidget(vm.widgetId)
                    .success(function (res) {
                        vm.success = "Widget deleted";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                    })
                    .error(function (err) {
                        vm.alert = "Unable to delete widget";
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