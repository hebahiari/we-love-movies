const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reviews.service");

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
    const reviews = await service.list(movieId);
    res.status(200).json({ data: reviews })
}

async function update(req, res) {
    const updatedReview = {...req.body.data, review_id: req.params.reviewId };

    const review = await service.update(updatedReview);
    res.status(201).json({ review });
}

async function destroy(req, res) {
    await service.delete(req.params.reviewId)
    res.sendStatus(204)
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    list: asyncErrorBoundary(list)
};