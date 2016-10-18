( function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController",WebsiteListController );

        function WebsiteListController($scope) {
            var websites = [
                {"name": "pushpinder", "_id": 123},
                {"name": "utkarsh", "_id": 456}
            ];

            $scope.websites = websites;
            console.log("welcome to WebsiteListController");
        }

    }
)();