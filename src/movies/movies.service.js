const knex = require("../db/connection");

function listAllMovies() {
    return knex("movies")
        .select("*")
}

function listShowingMovies() {
    return knex("movies as m")
        .select("*")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .where({ "mt.is_showing": true })
}

function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first()
}

module.exports = {
    listAllMovies,
    listShowingMovies,
    read
}