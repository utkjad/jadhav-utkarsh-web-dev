(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location,  PageService) {
        var vm = this;
        vm.profile = profile;
        vm.back = back;
        vm.newPage = newPage;
        vm.createPage = createPage;
        vm.openPage = openPage;
        vm.editPage = editPage;
        vm.clear = clear;
        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            console.log("WebsiteEditController loaded");
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function createPage(page) {
            if (page && page.name) {
                page = PageService.createPage(vm.websiteId, page);
                if (page) {
                    vm.success = "Page created";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                } else {
                    vm.alert = "Unable to create page";
                }
            } else {
                vm.alert = "Please fill fields to create page";
            }
        }

        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }
})();
