(function () {
    console.log("controller.js");
    angular
        .module("SDApp")
        .controller("SDAppController", SDAppController);

    function SDAppController(service) {
        console.log("In SDAppController");
        var vm = this;

        vm.sendSDPostReq = sendSDPostReq;
        function sendSDPostReq() {
            service
                .ScriptDashPost()
                .success(function (result) {
                    alert("Success!!");
                    vm.result = result;
                })
                .error(function (error) {
                    console.log(error);
                })
        }
    }
})();