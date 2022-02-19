const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./movies.service");

async function movieExists(req, res, next) {
    const movieId = req.params.movieId;
    const foundMovie = await service.read(movieId);
    if (foundMovie) {
        res.locals.movie = foundMovie;
        next();
    } else {
        next({
            message: `Movie cannot be found.`,
            status: 404,
        });
    }
}

function read(req, res) {
    const foundMovie = res.locals.movie;
    res.status(200).json({ data: foundMovie });
}

async function list(req, res) {
    const isShowing = req.query.is_showing;

    if (isShowing) {
        const showingMovies = await service.listShowingMovies();
        res.status(200).json({ data: showingMovies });
    } else {
        const allMovies = await service.listAllMovies();
        res.status(200).json({ data: allMovies });
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
    movieExists: asyncErrorBoundary(movieExists),
};