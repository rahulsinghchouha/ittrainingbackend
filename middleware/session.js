exports.isAuthenticated = async (req, res, next) => {
    try {
        await new Promise((resolve, reject) => {
            req.session.reload(err => {
                if (err) reject(err);
                else resolve();
            });
        });

        if (req.session?.user) {
            return next();
        }
        // Clear invalid session cookie if exists
        else {
            res.clearCookie('connect.sid');
            return res.redirect('/login');
        }


    }

    catch (error) {
        console.error('Auth middleware error:', error);
        return res.redirect('/login');

    }


}