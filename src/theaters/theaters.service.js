const knex = require("../db/connection");


function listAllTheaters() {
    return knex("theaters as t")
        .select("*")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .join("movies as m", "m.movie_id", "mt.movie_id")
}

function listMovieTheaters(movieId) {
    return knex("theaters as t")
        .select("t.*")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater.id")
        .where({ "mt.movie_id": movieId })
}

module.exports = {
    listAllTheaters,
    listMovieTheaters
}