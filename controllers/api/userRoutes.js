const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
  try {
    
    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;

      res.status(200).json(newUser);
    });
  } catch (error) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    
    const userData = await User.findOne({ 
        where: { username: req.body.username } 
    });


    if (!userData || !userData.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Incorrect username or password, try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.loggedIn = true;

      res.status(200).json({ message: 'Login successful' });
    });
  } catch (error) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.status(204).end();
  });
});

module.exports = router;
