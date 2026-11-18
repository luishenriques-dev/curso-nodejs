exports.getLogin = (req, res, next) => {
  const cookie = req.get('Cookie');
  const isLoggedIn = cookie ? cookie.includes('loggedIn=true') : false;
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLoggedIn
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-Cookie', 'LoggedIn=true; HttpOnly');
  res.redirect('/');
};