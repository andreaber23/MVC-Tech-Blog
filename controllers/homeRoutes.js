const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req,res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                 model: User,
                 attributes: ['name'],
                },
                {
                 model: Comment,
                 attributes: ['comment_post']
                },
            ],
        });

        const blogPost = blogPostData.map((blogPost)=>
         blogPost.get({plain:true}))

        res.render('homepage', { 
            blogPost,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
      }
});

router.get("/blogPost/:id", withAuth, async (req,res) => {
    try {
        const blogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                 model: User,
                 attributes: ['name'],
                },
                {
                 model: Comment,
                 attributes: [User]
                },
            ],
        });

        const blogPost = blogPostData.get({plain:true});

        res.render('blogPost', { 
            ...blogPost,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        res.status(500).json(err);
      };
});

router.get('/login', (req, res) => {
   
    if (req.session.logged_in) {
      res.redirect('/');
      return;
    }
    res.render('login');
  });

  router.get("/signup",(req,res)=>{
    res.render("signup")
})
  
  module.exports = router;
  