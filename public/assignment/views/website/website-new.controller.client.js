(function (){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService ) {
        var vm = this;
        vm.userId = $routeParams["uid"];
        vm.clear = clear;
        vm.profile = profile;
        vm.editWebsite = editWebsite;
        vm.openWebsite = openWebsite;
        vm.createWebsite = createWebsite;
        vm.newWebsite = newWebsite;
        vm.back = back;

        function init() {
            console.log("NewWebsiteController loaded");
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (responseWebsite) {
                    vm.websites = responseWebsite;
                })
                .error(function (err) {
                    vm.alert = "Unable to find Websites for user " + vm.userId;
                })
        }
        init();

        function back() {
            $location.url("/user/" + vm.userId + "/website");
        }

        function newWebsite() {
            $location.url("/user/" + vm.userId + "/website/new");
        }

        function createWebsite(website){
            if (website && website.name) {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .success(function (website) {
                        vm.success = "Created Website " + website.name + "!!! Yippe!";
                        console.log("In createWebsite " + website.name + " exists now!");
                        $location.url("/user/" + vm.userId + "/website");
                    })
                    .error(function (err) {
                        vm.alert = "Cannot create website!";
                    })
            } else {
                vm.alert = "Please enter details of website including name and description.";
            }

        }

        function openWebsite(website) {
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