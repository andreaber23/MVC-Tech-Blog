const router = require("express").Router();
const { BlogPost, Comment, User } = require("../../models");
const { param } = require("./blogPostRoute");

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
      const newComment = await Comment.create({
        comment_post: req.body.comment_post,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newComment);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  //update
  route.put("/:id", async (req,res) => {
    try {
        const updateComment = await Comment.update(req.body, {
            where:{
                id: req.params.id
            },
        })
        
        if (!updateComment[0]){
            res.status(400).json({ message: "No comment found with this id!" });
      return;
        }
        console.log("comment was updated"),
        res.status(200).json(updateComment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
  })

  // delete

  router.delete('/:id', async(req, res) => {
    try {
      const deleteComment = await Comment.destroy({
        where: {id: req.params.id}
      });
      if (!deleteComment){
        res.status(404).json({ message: 'No comment found with this id!' });
        return;
      }
      res.status(200).json(deleteComment);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  