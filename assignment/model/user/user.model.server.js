module.exports = function (mongoose) {
    console.log("In SERVER user.model.server.js");
    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser : createUser,
        findUserByUserId: findUserByUserId,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByCredential:findUserByCredential,
        findUserByUsername: findUserByUsername,
        findUserByFacebookId: findUserByFacebookId
    };
    return api;

    function findUserByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

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