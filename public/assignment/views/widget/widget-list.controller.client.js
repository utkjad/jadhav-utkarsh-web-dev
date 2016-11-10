( function () {
        angular
            .module("WebAppMaker")
            .controller("WidgetListController",WidgetListController );

        function WidgetListController($sce, $location, $routeParams, WidgetService) {
            var vm = this;
            vm.userId = $routeParams["uid"];
            vm.websiteId = $routeParams["wid"];
            vm.pageId = $routeParams["pid"];
            vm.back = back;
            vm.newWidget = newWidget;
            vm.editWidget = editWidget;
            vm.getSafeHtml = getSafeHtml;
            vm.getSafeUrl = getSafeUrl;
            vm.profile = profile;
            vm.reorderWidget = reorderWidget;

            function init() {
                WidgetService
                    .findWidgetsByPageId(vm.pageId)
                    .success(function (widgets) {
                        vm.widgets = widgets;
                    })
                    .error(function (err) {
                        vm.alert = "Unable to load widgets!";
                    })
            }
            init();

            function reorderWidget(start, end) {
                WidgetService
                    .reorderWidget(vm.pageId, start, end)
                    .success(function (response) {
                        vm.success = "Widgets reordered";
                    })
                    .error(function (error) {
                        vm.alert = "Unable to reorder widgets";
                    })
            }
            function back() {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            }

            function newWidget() {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/new");
            }

            function editWidget(widget) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widget._id);
            }

            function getSafeHtml(widget) {
                return $sce.trustAsHtml(widget.text);
            }

            function getSafeUrl(widget) {
                var urlParts = widget.url.split("/");
                var id = urlParts[urlParts.length - 1];
                var url = "https://www.youtube.com/embed/" + id;
                return $sce.trustAsResourceUrl(url);
            }

            function profile() {
                $location.url("/user/" + vm.userId);
            }
        }
    }
)();