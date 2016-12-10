(function () {
    angular
        .module('WebAppMaker')
        .config(Config);

    // resolve loggedIn
    // TODO
    var checkLoggedIn = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();
        var url = "/api/loggedin";
        $http.get(url)
            .success(function (user) {
                $rootScope.errorMessage = null;
                if (user !== '0') {
                    $rootScope.currentUser = user;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/login");
                }
            });
        return deferred.promise;
    };

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                redirectTo: '/login'
            })

            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedIn: checkLoggedIn}
            })

            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller : "WebsiteListController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller : "NewWebsiteController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller : "EditWebsiteController",
                controllerAs : "model"
            })

            .when("/user/:uid/website/:wid/page", {
                templateUrl: "views/page/page-list.view.client.html",
                controller : "PageListController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: "views/page/page-new.view.client.html",
                controller : "NewPageController",
                controllerAs : "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: "views/page/page-edit.view.client.html",
                controller : "EditPageController",
                controllerAs : "model"
            })

            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget/:wgid", {
                templateUrl: "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })

            .otherwise({
                    redirectTo: '/login'
                }
            );
    }
})();