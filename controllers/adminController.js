const bcrypt = require("bcryptjs");
const passport = require("passport");
const Admin = require("../models/Manager")


exports.getLogin = (req, res) => {
    res.render("login");
};
exports.getRegister = (req, res) => {
    res.render("register");
};
exports.postLogin = (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/get-login",
        failureFlash: true,
    })(req, res, next);
};
exports.registerAdmin = (req, res) => {
    const { username, email, password, password2 } = req.body;
    let errors = [];

    if (!username || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            username,
            email,
            password,
            password2
        });
    } else {
        Admin.findOne({ email: email }).then(admin => {
            if (admin) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    //destructuring
                    errors,
                    username,
                    email,
                    password,
                    password2
                });
            } else {
                const newAdmin = new Admin({
                    //destructuring
                    username,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin
                            .save()
                            .then(admin => {
                                req.flash(
                                    'success_msg',
                                    'You are now registered and can log in'
                                );
                                res.redirect('/get-login');
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    }
}
exports.getLogout = (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/get-login");
};