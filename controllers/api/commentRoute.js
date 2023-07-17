const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");

//get all comments
router.get("/", async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        include: [
          {
            model: User,
            attributes: ["username"],
          },
          {
            model: BlogPost,
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(commentData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// create comment
router.post("/", async (req, res) => {
    try {
      const comment = await Comment.create({
        comment_post: req.body.comment_post,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });