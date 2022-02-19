const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");
const mapProperties = require("../utils/map-properties");

async function reviewExists(req, res, next) {
    const reviewId = req.params.reviewId;
    const foundReview = await service.read(reviewId);
    if (foundReview.length) {
        next();
    } else {
        next({
            message: `Review cannot be found.`,
            status: 404,
        });
    }
}

async function list(req, res) {
    const movieId = req.params.movieId;
    const data = await service.list(movieId);

    const reduceCritic = mapProperties({
        critic_id: ["critic", "critic_id"],
        preferred_name: ["critic", "preferred_name"],
        surname: ["critic", "surname"],
        organization_name: ["critic", "organization_name"],
    });

    const reviews = data.map(reduceCritic);

    res.status(200).json({ data: reviews });
}

async function update(req, res) {
    const reviewId = req.params.reviewId;
    const updatedReview = {...req.body.data, review_id: reviewId };

    await service.update(updatedReview);
    const data = await service.read(reviewId);

    const reduceCritic = mapProperties({
        preferred_name: ["critic", "preferred_name"],
        surname: ["critic", "surname"],
        organization_name: ["critic", "organization_name"],
    });

    res.status(201).json({ data: reduceCritic(data[0]) });
}

async function destroy(req, res) {
    await service.delete(req.params.reviewId);
    res.sendStatus(204);
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    list: asyncErrorBoundary(list),
};