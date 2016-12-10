module.exports = function (mongoose) {
    console.log("PROJECT SERVER User.model.server.js");
    var UserSchema = require('./user.schema.server')(mongoose);
    var MRUser = mongoose.model('MRUser', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        likeMovie: likeMovie,
        unlikeMovie: unlikeMovie,
        isLiked: isLiked,
        addFollower: addFollower,
        addFollowing: addFollowing,
        removeFollowing: removeFollowing,
        removeFollower: removeFollower,
        isFollowing: isFollowing,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowers: findAllFollowers,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return MRUser.create(user);
    }

    function findAllUsers() {
        return MRUser.find();
    }

    function findUserById(userId) {
        return MRUser.findById(userId);
    }

    function findUserByUsername(username) {
        return MRUser.findOne({username: username});
    }

    function findUserByCredentials(username, password) {
        return MRUser.findOne({username: username, password: password});
    }

    function findUserByFacebookId(facebookId) {
        return MRUser.findOne({'facebook.id': facebookId});
    }

    function likeMovie(userId, mid) {
        return MRUser.update({_id: userId}, {$addToSet: {movieLikes: mid}});
    }

    function unlikeMovie(userId, mid) {
        return MRUser.update({_id: userId}, {$pullAll: {movieLikes: [mid]}});
    }

    function isLiked(userId, mid) {
        return MRUser.findOne({_id: userId}, {$and: [{movieLikes: {$in: [mid]}}]});
    }

    function addFollower(userId, followerId) {
        return MRUser.update({_id: userId}, {$addToSet: {followers: followerId}});
    }

    function addFollowing(userId, followingId) {
        return MRUser.update({_id: userId}, {$addToSet: {following: followingId}});
    }

    function removeFollowing(userId, followingId) {
        return MRUser.update({_id: userId}, {$pullAll: {following: [followingId]}});
    }

    function removeFollower(userId, followerId) {
        return MRUser.update({_id: userId}, {$pullAll: {followers: [followerId]}});
    }

    function isFollowing(userId, followId) {
        return MRUser.findOne({_id: userId, following: {$in: [followId]}});
    }

    function findAllFollowingUsers(userIds) {
        return MRUser.find({_id: {$in: userIds}});
    }

    function findAllFollowers(userIds) {
        return MRUser.find({_id: {$in: userIds}});
    }

    function updateUser(userId, user) {
        delete user._id;
        return MRUser.update({_id: userId}, {$set: user});
    }

    function deleteUser(userId) {
        return MRUser.remove({_id: userId});
    }

};