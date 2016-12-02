module.exports = function () {
    console.log("In SERVER user.model.server.js");
    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser : createUser,
        findUserByUserId: findUserByUserId,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredential:findUserByCredential,
        findUserByUsername: findUserByUsername
    };
    return api;

    function findUserByUsername(username) {
        return UserModel
            .findOne({username: username});
    }

    function deleteUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUserByCredential(username, password){
        return UserModel
            .findOne(
                {
                    username : username,
                    password : password
                }
            );
    }
    function updateUser(userID, user) {
         return UserModel
             .update(
                 {
                     _id:userID
                 },
                 {
                     firstName: user.firstName,
                     lastName:user.lastName
                 }
             );
    }
    function createUser(user) {
        return UserModel.create(user);
    }

    function findUserByUserId(userID) {
        return UserModel.findById(userID);
    }
};