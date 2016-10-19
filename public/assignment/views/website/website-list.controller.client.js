( function () {
        angular
            .module("WebAppMaker")
            .controller("WebsiteListController",WebsiteListController );

        function WebsiteListController($location, $routeParams, WebsiteService) {
            var vm = this;
            vm.userId = $routeParams.uid;
            vm.profile = profile;
            vm.editWebsite = editWebsite;
            vm.openWebsite = openWebsite;
            vm.newWebsite = newWebsite;
            vm.back = back;

            function init() {
                console.log("WebsiteListController loaded");
                vm.websites = WebsiteService.findWebsitesByUser(vm.userId);
            }
            init();

            function back(){
                $location.url("/user/" + vm.userId);
            }

            function newWebsite() {
                $location.url("/user/" + vm.userId + "/website/new");
            }

            function openWebsite(website){
                $location.url("/user/" + vm.userId + "/website/" + website._id + "/page");
            }


            function editWebsite(website){
                $location.url("/user/" + vm.userId + "/website/" + website._id);
            }

            function profile(){
                $location.url("/user/" + vm.userId);
            }
        }
    }
)();