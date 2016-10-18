(function () {
    angular
        .module('WebAppMaker')
        .config(Config);


    function Config($routeProvider) {
        $routeProvider
            // .when("/", {
            //     redirectTo: '/login'
            // })

            // User related
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: 'LoginController',
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/user/:uid", {
                templateUrl: "views/user/profile.view.client.html"
            })

            // Website related
            .when("/website", {
                templateUrl: "views/website/website-list.view.client.html",
                // controller:"WebsiteListController"

            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html"
            })

            // Page related
            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html"
            })

            // Widget related
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-chooser.view.client.html"
            })
            .otherwise({
                    redirectTo: '/login'
                }
            );
    }
})();