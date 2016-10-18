(function(){
        angular
            .module('WebAppMaker')
            .controller('LoginController', LoginController);

        function LoginController() {
            var vm = this;
            vm.login = function(username, password) {
                console.log(username, password);
                var found = false;
                var users = [
                    {username :"utk", password: 'qwe'},
                    {username :"utk3", password: 'qwe'},
                    {username :"utk2", password: 'qwe'}
                ];
                for (var u in users){
                    var user = users[u];
                    if (user.username === username && user.password === password){
                        console.log("found user");
                        found = true;
                        break;
                    }
                }
                if (!found ){
                    console.log("not found");
                    vm.error = "NOT FOUND USER";
                }
            }
        }
    })();
