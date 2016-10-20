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

            function init() {
                vm.widgets = WidgetService.findWidgetsByPageId(vm.pageId);
            }
            init();

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