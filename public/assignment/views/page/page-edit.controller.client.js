(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location,  PageService) {
        var vm = this;
        vm.pageId = $routeParams.pid;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.back = back;
        vm.newPage = newPage;
        vm.updatePage = updatePage;
        vm.openPage = openPage;
        vm.editPage = editPage;
        vm.deletePage = deletePage;
        vm.profile = profile;
        vm.clear = clear;

        function init() {
            console.log("EditPageController loaded");
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error( function (err) {
                    vm.alert = "could not retrieve the pages!";
                })

            PageService
                .findPageById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error( function (err) {
                    vm.alert = "could not find the page!";
                })
        }
        init();

        function updatePage(page) {
            if (page.name){
                PageService
                    .updatePage(vm.pageId, page)
                    .success(function (page) {
                        vm.success = "Page updated";
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                    })
                    .error(function (err) {
                        vm.alert = "cannot update page";
                    })
            }
            else {
                vm.alert = "Please provide page name!"
            }
        }

        function deletePage(page) {
            PageService
                .deletePage(vm.pageId)
                .success(function (res) {
                    vm.success = "Page deleted";
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                })
                .error(function (err) {
                    vm.alert = "Unable to delete page";
                })
        }

        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }

        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function newPage() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/new");
        }

        function back() {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
        }

        function clear() {
            vm.success = "";
            vm.alert = "";
        }
    }
})();