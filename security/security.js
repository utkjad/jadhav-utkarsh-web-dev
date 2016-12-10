module.exports = function (database, passport) {
    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    var assignmentModel = database.wamModels().userModel;
    var projectModel = database.MRModels().userModel;


    var wamFacebookConfig = {
        clientID: process.env.facebookAppID,
        clientSecret: process.env.facebookAppSecret,
        callbackURL: process.env.facebookCallback
    };

    passport.use('wam', new LocalStrategy(wamStrategy));
    passport.use('mr', new LocalStrategy(MRStrategy));

    passport.use('assignmentFacebook', new FacebookStrategy(wamFacebookConfig, wamFacebookStrategy));

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var api = {
        getPassport: getPassport,
        getBCrypt: getBCrypt
    };
    return api;


    function wamFacebookStrategy(token, refreshToken, profile, done) {
        assignmentModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    assignmentModel
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            console.log(err);
                            return done(err, null);
                        });
                }
            }, function (err) {
                console.log(err);
                return done(err, null);
            });
    }

    function wamStrategy(username, password, done) {
        assignmentModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }


    function MRStrategy(username, password, done) {
        projectModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        if (user.type === 'assignment') {
            assignmentModel
                .findUserByUserId(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });
        } else if (user.type === 'mr') {
            projectModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });
        }
    }

    function getPassport() {
        return passport;
    }

    function getBCrypt() {
        return bcrypt;
    }

};