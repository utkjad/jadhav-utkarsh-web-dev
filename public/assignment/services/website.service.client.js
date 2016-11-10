(function () {
        angular
            .module("WebAppMaker")
            .factory("WebsiteService", WebsiteService);

        function WebsiteService($http) {
            var api = {
                createWebsite: createWebsite,
                findWebsitesByUser: findWebsitesByUser,
                findWebsiteById: findWebsiteById,
                updateWebsite: updateWebsite,
                deleteWebsite: deleteWebsite
            };
            return api;

            function createWebsite(userId, website){
                var url = "/api/user/" + userId + "/website";
                return $http.post(url, website);
            }

            function findWebsitesByUser(userId) {
                var url = "/api/user/" + userId + "/website";
                return $http.get(url);
            }

            function findWebsiteById(wid) {
                var url = "/api/website/" + wid;
                return $http.get(url);
            }

            function updateWebsite(websiteId, website) {
                var url = "/api/website/" + websiteId;
                return $http.put(url, website);
            }

            function deleteWebsite(websiteId){
                var url = "/api/website/" + websiteId;
                return $http.delete(url);
            }
        }
    }
)();