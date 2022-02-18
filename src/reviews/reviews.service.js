const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": reviewId })
}

function list(movieId) {
    return knex("reviews")
        .select("*")
        .where({ movie_id: movieId })
}

function destroy(reviewId) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": reviewId })
        .del();
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ "review_id": updatedReview.review_id })
        .update(updatedReview)
}

module.exports = {
    update,
    read,
    delete: destroy,
    list
}