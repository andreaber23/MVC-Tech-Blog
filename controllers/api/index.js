const router = require("express").Router();
const userRoutes = require("./userRoutes");
const blogPostRoutes = require("./blogPostRoute");
const commentRoutes = require("./commentRoute");
const dashBoardRoute = require("./dashboardRoute");

route.use("/user", userRoutes);
route.use("/blogPost", blogPostRoutes);
route.use("/comment", commentRoutes);

module.exports = router;