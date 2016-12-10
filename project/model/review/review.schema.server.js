module.exports = function (mongoose) {
    console.log("PROJECT SERVER Review.schema.server.js");
    var ReviewSchema = mongoose.Schema({
        title: String,
        description: String,
        timestamp: {type: Date, default: Date.now()},
        movieId: String,
        _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'MRMovie'},
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'MRUser'},
        rating: String
    }, {collection: 'mr.review'});
    return ReviewSchema;

};