const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

// Load User model
const Manager = require("../models/Manager");

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
            // Match user

            Manager.findOne({ email: email }).then((user) => {
                if (!user) {
                    return done(null, false, {
                        message: "That email is not registered",
                    });
                } else if (user.isManager === "NO") {
                    return done(null, false, {
                        message: "Your account has been suspended!",
                    });
                }

                // Match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, { message: "Password incorrect" });
                    }
                });
            });
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Manager.findById(id, function (err, user) {
            done(err, user);
        });
    });
};