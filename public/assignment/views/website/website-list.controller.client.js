( function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController );

        function WebsiteListController($routeParams, WebsiteService) {
            var vm = this;
            vm.userID = $routeParams.uid;

            function init() {
                //pushpinder bhai kaa advice lagalo. kaam ayega

                vm.websites = WebsiteService.findWebsitesForUser(vm.userID);
            }
            init();
        }
    }
)();