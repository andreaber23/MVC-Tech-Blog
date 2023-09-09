const router = require("express").Router();
const { BlogPost, User, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req,res) => {
    try {
        const blogPostData = await BlogPost.findAll({
            include: [
                {
                 model: User,
                 attributes: ['username'],
                },
            ],
        });

        const blogPost = blogPostData.map((blogPost)=>
         blogPost.get({plain: true}))

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
                 model: Comment,
                 attributes: ['id','title','description', 'date_created','user_id'],
                 include: {
                    model: User,
                    attributes: ['username'],
                   },
                },
            ],
        });

       const comments = blogPostData.comments.map(comment => comment.get({ plain: true }))

        res.render('blogPost', { 
            ...blogPostData.get({ plain: true }),
            logged_in: req.session.logged_in,
            comments: comments,
        });
    } catch (err) {
        res.status(500).json(err);
      };
});

router.get('/login', (req, res) => {
   
    if (req.session.logged_in) {
      res.redirect('/dashboard');
      return;
    }
    res.render('login');
  });

  router.get("/signup",(req,res)=>{
    if (req.session.logged_in) {
        res.redirect('/dashboard');
    return;
}
    res.render('signup');
})

router.get('/dashboard', withAuth, async (req,res) => {
    try{
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {
                exclude: ['password']},
                include:[
                    {model: BlogPost}],
            });
 
            const user = userData.get({plain: true });
            res.render('dashboard', {
                ...user,
                logged_in: true,
            });
        } catch (err) {
            res.status(500).json(err);
          }
});
   
  module.exports = router;
  