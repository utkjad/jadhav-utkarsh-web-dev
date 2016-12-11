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

        function createPage(page) {
            if (page.name) {
                PageService
                    .createPage(vm.websiteId, page)
                    .success(function (res) {
                        vm.success = "Page created";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function (err) {
                        vm.alert = "Unable to create page";
                    })
            } else {
                vm.alert = "Please fill name of the page!";
            }
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
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
