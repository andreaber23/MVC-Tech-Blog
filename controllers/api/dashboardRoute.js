const router = require('express').Router();
const sequelize = require('../../config/connection');
const { BlogPost, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
    try {
      const userId = req.session.userId;
      
      const userBlogPosts = await BlogPost.findAll({
        where: { user_id: userId },
        include: [
          {
            model: User,
            attributes: ['username'],
          },
        ],
      });
      res.render('dashboard', { blogPosts: userBlogPosts });
    } catch (error) {
    res.status(500).json(err);;
    }
  });
  
  

module.exports = router;