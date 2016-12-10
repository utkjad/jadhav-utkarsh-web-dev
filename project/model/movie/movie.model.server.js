module.exports = function (mongoose) {
    console.log("PROJECT SERVER Movie.model.server.js");

    var MovieSchema = require('./movie.schema.server')(mongoose);
    var MRMovie = mongoose.model('MRMovie', MovieSchema);

    var api = {
        addMovie: addMovie,
        findMovieById: findMovieById,
        findMovieByMovieId: findMovieByMovieId,
        findAllLikedMovies: findAllLikedMovies,
        deleteMovieById: deleteMovieById,
        deleteMovieByMovieId: deleteMovieByMovieId
    };
    return api;

    function addMovie(movie) {
        movie.movieId = movie.id.toString();
        return MRMovie.create(movie);
    }

    function findMovieById(id) {
        return MRMovie.findById(id);
    }

    function findMovieByMovieId(movieId) {
        return MRMovie.findOne({movieId: movieId});
    }

    function findAllLikedMovies(movieIds) {
        return MRMovie.find({movieId: {$in: movieIds}});
    }

    function deleteMovieById(id) {
        return MRMovie.remove({_id: id});
    }

    function deleteMovieByMovieId(movieId) {
        return MRMovie.remove({movieId: movieId});
    }

};
