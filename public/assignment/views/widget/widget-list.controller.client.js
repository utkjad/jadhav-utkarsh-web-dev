( function () {
        angular
            .module("WebAppMaker")
            .controller("WidgetListController",WidgetListController );

        function WidgetListController($routeParams, WidgetService) {
            var vm = this;
            vm.pid = $routeParams.pid;

            function init() {
                vm.widgets = WidgetService.findWidgetForPage(vm.pid);
            }
            init();
        }
    }
)();