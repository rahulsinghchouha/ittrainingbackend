exports.isAuthenticated = async (req, res, next) => {
      console.log("inside the cookies", req.session);
    const token = req.session.token; // Ensure 'token' matches the name used in res.cookie

    if (token) {
        console.log("token found", token);
        return next();
    } else {
        console.log("token not found", token);
        return res.redirect('/login?error=session_expired');
    }
   
  };