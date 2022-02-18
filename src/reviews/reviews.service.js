const knex = require("../db/connection");

function read(reviewId) {
    return knex("reviews as r")
        .select("*")
        .where({ "r.review_id": reviewId })
        .join("critics as c", "r.critic_id", "c.critic_id")
}

function list(movieId) {
    return knex("reviews as r")
        .select("*")
        .where({ movie_id: movieId })
        .join("critics as c", "c.critic_id", "r.critic_id")
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