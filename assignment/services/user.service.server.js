module.exports = function (app, model, security) {
    console.log("In SERVER user.service.server.js");

    var bcrypt = security.getBCrypt();
    var passport = security.getPassport();

    app.get('/api/user', findUser);
    app.post('/api/user', createUser);
    app.get('/api/user/:uid', findUserByUserId);
    app.put('/api/user/:uid', updateUser);
    app.delete('/api/user/:uid', deleteUser);

    // Login and logout requests
    app.post('/api/login', passport.authenticate('wam'), login);
    app.post('/api/logout', logout);
    app.post('/api/register', register);
    app.get('/api/loggedin', loggedIn);
    app.get('/api/auth/facebook', passport.authenticate('assignmentFacebook', {scope: 'email'}));
    app.get('/auth/facebook/callback',
        passport.authenticate('assignmentFacebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));


    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        model
            .userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }, function (error) {
                if (error.code === 11000)
                    res.status(409).send("Duplicate username");
                else
                    res.status(400).send(error);
            });
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }


// NON PASSPORT

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