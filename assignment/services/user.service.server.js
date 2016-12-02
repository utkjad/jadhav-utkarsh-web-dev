module.exports = function (app, model) {
    console.log("In SERVER user.service.server.js");

    app.get('/api/user', findUser);
    app.post('/api/user', createUser);
    app.get('/api/user/:uid', findUserByUserId);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req, res) {
        var userId = req.params.uid;
        model
            .userModel
            .deleteUser(userId)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }

    function updateUser(req, res) {
        var userId = req.params.uid;
        var user = req.body;

        model
            .userModel
            .updateUser(userId, user)
            .then(
                function (status) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function createUser(req, res) {
        var user = req.body;
        model
            .userModel
            .createUser(user)
            .then(
                function (newUser) {
                    res.json(newUser);
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
    }

    function findUser(req, res) {
        var query = req.query;
        var username = query["username"]
        var password = query["password"]
        if (password) {
            findUserByCredential(username, password, res);
        } else {
            findUserByUsername(username, res);
        }
    }

    function findUserByCredential(username, password, res) {
        model
            .userModel
            .findUserByCredential(username, password)
            .then(
                function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.send("0");
                    }
                },
                function (error) {
                    res.sendStatus(400);
                }
            );
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
        var userId = req.params.uid;
        model
            .userModel
            .findUserByUserId(userId)
            .then(
                function (user) {
                    if (user) {
                        res.send(user);
                    } else {
                        res.send("0");
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

};