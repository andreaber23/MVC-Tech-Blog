const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoute");
const commentRoutes = require("./commentRoute");
const dashBoardRoute = require("./dashboardRoute");

router.use("/user", userRoutes);
router.use("/blogPost", blogPostRoutes);
router.use("/comment", commentRoutes);

module.exports = router;