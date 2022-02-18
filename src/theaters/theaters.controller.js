const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service")

async function list(req, res) {
    const movieId = req.params.movieId;
    if (movieId) {
        const movieTheaters = await service.listMovieTheaters(movieId)
        res.status(200).json({ data: movieTheaters })
    } else {
        const allTheaters = await service.listAllTheaters();
        res.status(200).json({ data: allTheaters })
    }
}

module.exports = {
    list: asyncErrorBoundary(list)
}