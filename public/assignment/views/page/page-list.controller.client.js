(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    function PageListController($routeParams, $location,  PageService) {
        var vm = this;
        vm.back = back;
        vm.clear = clear;
        vm.profile = profile;
        vm.editPage = editPage;
        vm.newPage = newPage;
        vm.openPage = openPage;

        vm.userId = $routeParams["uid"];
        vm.websiteId = $routeParams["wid"];

        function init() {
            console.log("PageListController loaded");
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error( function (err) {
                    vm.alert = "could not retrieve the pages!";
                })
        }
        init();

        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }
        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }
        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }
        function profile() {
            $location.url("/user/" + vm.userId);
        }
        function back() {
            $location.url("/user/" + vm.userId + "/website/");
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }
})();