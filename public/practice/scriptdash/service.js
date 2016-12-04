(function () {
    angular
        .module("SDApp")
        .factory("service", service);

    function service($http) {
        var api = {
            "ScriptDashPost" : ScriptDashPost
        };
        return api;

        function ScriptDashPost() {
            console.log("ScriptDashPost");

            url = "https://www.scriptdash.com/careers/apply";
            data = {
                "name": "Utkarsh Jadhav",
                "about": "A Computer Science graduate student " +
                " studying at Northeastern University." +
                "A software/web dev guy with focus on back-end " +
                "& distributed systems, and" +
                "currently learning MEAN stack to dabble with JS!" +
                " I am passionate about developing software which have" +
                " meaningful and widespread impact, and are fun to develop." +
                "When I have time, I like to read non-fiction books," +
                " do cycling, bird-watching, or calligraphy.",
                "email": "jadhav.u@husky.neu.edu",
                "links": ["https://utkarshj.herokuapp.com/homepage/files/utkarsh_resume.pdf",
                    "https://open.edx.org/blog/intern-spotlight-utkarsh-jadhav",
                    "https://utkarshj.herokuapp.com"
                ]
            };

            return $http.post(url, data);
        }
    }
})();