const User = require('../models/userModel');

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email})
    .then(userDoc => {
      if (userDoc) {
        return res.redirect('/signup');
      }
      const user = new User ({
        name: name,
        email: email,
        password: password,
        cart: { itens: [] }
      });
      return user.save();
    })
    .then(result => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuthenticated: req.session.isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne()
    .then(user => {
      req.session.isLoggedIn = true;
            req.session.user = { _id: user._id.toString() };
      req.session.save(err => {
        if (err) console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};