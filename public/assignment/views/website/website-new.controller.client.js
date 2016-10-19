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
            vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
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
                website = WebsiteService.createWebsite(vm.userId, website);
                if (website) {
                    vm.success = "created website!yay!";
                    $location.url("/user/" + vm.userId + "/website");
                } else {
                    vm.alert = "cannot create website.";
                }
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