module.exports = function (app, models) {

    var movieModel = models.movieModel;

    app.post('/mr/movie', addMovie);

    function addMovie(req, res) {
        var movie = req.body;
        movieModel
            .addMovie(movie)
            .then(function (movie) {
                res.json(movie);
            }, function (err) {
                res.sendStatus(200);
            });
    }

};