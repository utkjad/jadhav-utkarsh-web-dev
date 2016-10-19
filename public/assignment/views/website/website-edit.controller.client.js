(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location,  WebsiteService) {
        var vm = this;
        vm.websiteId = $routeParams.wid;
        vm.userId = $routeParams.uid;
        vm.profile = profile;
        vm.newWebsite= newWebsite;
        vm.deleteWebsite = deleteWebsite;
        vm.editWebsite = editWebsite;
        vm.openWebsite = openWebsite;
        vm.updateWebsite = updateWebsite;
        vm.newWebsite = newWebsite;
        vm.back = back;
        vm.clear = clear;

        function init() {
            console.log("WebsiteEditController loaded");
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function updateWebsite(website) {
            isWebsiteUpdated = WebsiteService.updateWebsite(vm.websiteId, website);
            if (isWebsiteUpdated){
                vm.success = "Website updated successfully.";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "cannot update website";
            }
        }

        function openWebsite(website){
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
        }

        function deleteWebsite() {
            var isWebsiteDeleted = WebsiteService.deleteWebsite(vm.websiteId);
            if (isWebsiteDeleted){
                vm.success = "Website deleted.";
                $location.url("/user/" + vm.userId + "/website");
            } else {
                vm.alert = "Unable to delete website";
            }
        }
        function profile() {
            $location.url("/user/" + vm.userId);
        }

        function clear() {
            vm.alert = "";
            vm.success = "";
        }
    }
})();