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
            vm.pages = PageService.findPagesByWebsiteId(vm.websiteId);
            vm.page = PageService.findPageById(vm.pageId);
        }
        init();

        function profile() {
            $location.url("/user/" + vm.userId);
        }
        function deletePage(page) {
            var isPageDeleted = PageService.deletePage(vm.pageId);
            if (isPageDeleted) {
                vm.success = "Page deleted";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.alert = "Unable to delete page";
            }
        }
        function editPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id);
        }
        
        function openPage(page) {
            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + page._id + "/widget");
        }

        function updatePage(page) {
            page = PageService.updatePage(vm.pageId, page);
            if (page) {
                vm.success = "Page updated";
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
            } else {
                vm.alert = "cannot update page";
            }
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