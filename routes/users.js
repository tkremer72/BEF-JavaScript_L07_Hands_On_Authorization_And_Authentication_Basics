var express = require('express');
var router = express.Router();
//Include the models
var models = require('../models');
//bring in the passport service
var passport = require('../services/passport');


/* GET users listing. */
router.get('/', function (req, res, next) {
  if(req.user && req.user.Admin) {
    models.users
    .findAll({}).then(users => {
      res.render('listUsers', {users: users})
    });
  }else{
      res.send('You are not authorized to view the users list.')
  }
});

//Create the route to get signup
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

  //Create the route to create a new user in the database
router.post('/signup', function(req, res, next) {
  models.users
    .findOrCreate({
      where: {
        Username: req.body.username
      },
      defaults: {
        FirstName: req.body.firstName,
        LastName: req.body.lastName,
        Email: req.body.email,
        Password: req.body.password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('login');  //<---Redirect the user to the login screen
      } else {
        res.send('This user already exists');
      }
    });
});
//Create the route to get the login screen
router.get('/login', function(req, res, next) {
  res.render('login');
});
//Create the user login route
router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login' }),
  function (req, res, next) { res.redirect('profile') });  //<--- Called Without UserID

//Create the regular user profile route
router.get('/profile', function (req, res, next) {
  if (req.user) {
    models.users
      .findByPk(parseInt(req.user.UserId))
      .then(user => {
        if (user) {
          res.render('profile', {
            FirstName: user.FirstName,
            LastName: user.LastName,
            Email: user.Email,
            Username: user.Username,
            accessUser: req.user.Admin
          });
        } else {
          res.send('User not found');
        }
      });
  } else {
    res.redirect('/users/login');
  }
});
//Get a user by the user id for the users view
router.get('/:id', function (req, res, next) {
 if(req.user) {
  models.users
  .findByPk(parseInt(req.params.id))
  .then(user => {
    if (user) {
      res.render('users', {
        FirstName: user.FirstName,
        LastName: user.LastName,
        Email: user.Email,
        Username: user.Username,
        UserId: user.UserId,
        accessUser: req.user.Admin
      });
    } else {
      res.send('User not found!')
    }
  });
 }
});

//Delete a user from the database
router.post("/:id", function (req, res, next) {
 if(req.user && req.user.Admin) {
  let userId = parseInt(req.params.id);
  models.users
    .update({
      Deleted: true
    },
      {
        where: {
          UserId: userId
        }
      })
    .then(function (result) {
      if (result) {
        res.send('User has been deleted!')
      } else {
        res.send('User can not be deleted!')
      }
    }
    );
 } 
}); 
module.exports = router;
