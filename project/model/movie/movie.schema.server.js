module.exports = function (mongoose) {
    console.log("PROJECT SERVER Movie.schema.server.js");
    var MovieSchema = mongoose.Schema({
        movieId: {type: String, unique: true},
        title: String,
        imageUrl: String
    }, {collection: 'mr.movie'});
    return MovieSchema;

};