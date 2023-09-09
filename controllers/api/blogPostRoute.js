const router = require("express").Router();
const { BlogPost, User, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//new post
router.post("/", withAuth, async (req, res) => {
    try {
      const newBlogPost = await BlogPost.create({
        ...req.body,
        user_id: req.session.user_id,
      });

      res.status(200).json(newBlogPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// to edit a post that exists
router.put("/:id", withAuth, async (req, res) => {
    try {
      const blogPostData = await BlogPost.update(req.body, {
        where: {
          id: req.params.id,
        },
      });
  
    if (!blogPostData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
  
      res.status(200).json(blogPostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // to delete a post
router.delete("/:id", withAuth, async (req, res) => {
    try {
      const blogPostData = await BlogPost.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
    if (!blogPostData) {
        res.status(404).json({ message: "No post found with this id!" });
        return;
      }
  
      res.status(200).json(blogPostData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.put("/update-blogpost/:id", withAuth, async (req,res) => {
    try {
        const blogPostData = await BlogPost.update({
          description: req.body['post-descripion'],
          title: req.body['post-title']
        },
          {
            where:{
              user_id:req.session.user_id,
              id: req.params.id,
            },
        })
        
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
  })

  //create comment
router.post("/:id/comments", withAuth, async (req, res) => {
      try {
        const newComment = await Comment.create({
          ...req.body,
          post_id: req.session.user_id,
          user_id: req.params.id,
        });
    
        res.status(200).json(newComment);
      } catch (err) {
        console.error(err);
        res.status(500).json(err);
      }
    });

//get all comments
router.get("/:id/comments", async (req, res) => {
    try {
      const commentData = await Comment.findAll({
        where: { post_id: req.params.id },
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      });

      const comments = commentData.map((comment) => comment.get({plain: true}))
      res.status(200).json(comments);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  //update comment 
router.put("/comments/:id", withAuth, async (req,res) => {
    try {
        const updateComment = await Comment.update({
          text: req.body.text,
        },
          {
            where:{
              user_id:req.session.user_id,
              id: req.params.id,
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

  // delete comment
router.delete('/comments/:id', withAuth, async(req, res) => {
    try {
      const deleteComment = await Comment.destroy({
        where: {
          id: req.params.id,
          user_id:req.session.user_id,
      }
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
  