const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");
const reduceProperties = require("../utils/reduce-properties");

async function list(req, res) {
    const movieId = req.params.movieId;
    if (movieId) {
        const movieTheaters = await service.listMovieTheaters(movieId);
        res.status(200).json({ data: movieTheaters });
    } else {
        const data = await service.listAllTheaters();

        const reduceMovies = reduceProperties("theater_id", {
            movie_id: ["movies", null, "movie_id"],
            title: ["movies", null, "title"],
            rating: ["movies", null, "rating"],
            description: ["movies", null, "description"],
            runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
            image_url: ["movies", null, "image_url"],
        });

        const allTheaters = reduceMovies(data);
        res.status(200).json({ data: allTheaters });
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
};