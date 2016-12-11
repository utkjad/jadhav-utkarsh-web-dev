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

            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (responseWebsite) {
                    vm.websites = responseWebsite;
                })
                .error(function (err) {
                    vm.alert = "Unable to find Websites for user " + vm.userId;
                })
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success( function (retWebsite) {
                    vm.website = retWebsite;
                })
                .error( function (err) {
                    vm.alert = "Could not find website by Id";
                })

        }
        init();

        function deleteWebsite() {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function (res) {
                    vm.success = "Website deleted.";
                    $location.url("/user/" + vm.userId + "/website");
                })
                .error(function (err) {
                    vm.alert = "Unable to delete website";
                })
        }

        function updateWebsite(website) {
            if (website.name){
                WebsiteService
                    .updateWebsite(vm.websiteId, website)
                    .success(function (res) {
                        vm.success = "Website updated successfully.";
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function (err) {
                        vm.alert = "cannot update website";
                    })
            }
            else{
                vm.alert = "Please Specify name of the website!"
            }

        }

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function openWebsite(website){
            $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
        }

        function editWebsite(website) {
            $location.url("/user/" + vm.userId + "/website/" + website._id);
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