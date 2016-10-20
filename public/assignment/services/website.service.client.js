(function () {
        angular
            .module("WebAppMaker")
            .factory("WebsiteService", WebsiteService);

        function WebsiteService() {
            var websites = [
                { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
                { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
                { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
                { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
                { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
                { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
            ];

            var api = {
                createWebsite: createWebsite,
                findWebsitesByUser: findWebsitesByUser,
                findWebsiteById: findWebsiteById,
                updateWebsite: updateWebsite,
                deleteWebsite: deleteWebsite
            };
            return api;

            function createWebsite(userId, website){
                var newWebsite = {
                    _id: (new Date()).getTime() + "",
                    name: website.name,
                    developerId: userId,
                    description: website.description
                };
                websites.push(newWebsite);

                return newWebsite;
            }

            function findWebsitesByUser(userID) {
                var result = [];
                for(var website in websites){
                    if(websites[website].developerId == parseInt(userID)){
                        result.push(websites[website]);
                    }
                }
                return result;
            }

            function findWebsiteById(wid) {
                for(var website in websites){
                    if(websites[website]._id == parseInt(wid)){
                        return(websites[website]);
                    }
                }
                return null;
            }

            function updateWebsite(websiteId, website) {
                for (var curr_website in websites) {
                    if (websites[curr_website]._id === websiteId) {
                        websites[curr_website].name = website.name;
                        websites[curr_website].description = website.description;
                        websites[curr_website].developerId = website.developerId;
                        return true;
                    }
                }
                return false;
            }

            function deleteWebsite(websiteId){
                for (var i in websites) {
                    if (websites[i]._id === websiteId) {
                        websites.splice(i,1);
                        return true;
                    }
                }
                return false;
            }
        }
    }
)();