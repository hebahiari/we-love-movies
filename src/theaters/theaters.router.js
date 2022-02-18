const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");
const controller = require("./theaters.controller")

// router.route("/:movieId([0-9]+)")
//     .get(controller.read)

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

module.exports = router;