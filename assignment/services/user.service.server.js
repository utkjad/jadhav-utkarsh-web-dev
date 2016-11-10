module.exports = function (app) {
    console.log("in user.service.server.js");
    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.get('/api/user', findUser);
    app.post('/api/user', createUser);
    app.get('/api/user/:uid', findUserByUserId);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req, res) {
        var userId = parseInt(req.params.uid);
        for (var i in users) {
            currentUser = users[i];
            if (parseInt(currentUser._id) ===  parseInt(userId)){
                users.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function updateUser(req, res) {
        var userId = parseInt(req.params.uid);
        var user = req.body;

        for (var u in users){
            currentUser = users[u];
            if (parseInt(currentUser._id) ===  parseInt(userId)){
                currentUser.firstName = user.firstName;
                currentUser.lastName = user.lastName;
                currentUser.email = user.email;
                res.sendStatus(200);
                return;
            }
            res.sendStatus(400);
        }
    }
    function createUser(req, res) {
        var user = req.body;
        var newUser = {
            _id : (new Date()).getTime() + "",
            username: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName
        };
        users.push(newUser);
        if (newUser) {
            res.send(newUser);
            return;
        }
        res.send("0");
    }

    function findUser(req, res) {
        var query = req.query;
        if (query.username && query.password){
            findUserByCredential(req,res);
        } else if (query.username){
            findUserByUsername(req,res);
        }
    }

    function findUserByCredential(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        for(var u in users){
            if(users[u].username === username
                && users[u].password === password ){
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        for(var u in users){
            if(users[u].username === username){
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }

    function findUserByUserId(req, res) {
        var userId = parseInt(req.params.uid);
        for(var u in users){
            if(parseInt(users[u]._id ) === userId){
                res.send(users[u]);
                return;
            }
        }
        res.send("0");
    }


};