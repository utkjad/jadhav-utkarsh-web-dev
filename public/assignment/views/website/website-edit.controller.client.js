(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;
        vm.wid = $routeParams.wid;

        function init() {
            console.log("WebsiteEditController loaded");
            vm.website = WebsiteService.findWebsiteById(vm.wid);
        }
        init();
    }

})();