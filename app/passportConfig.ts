import googleOauth20 from "passport-google-oauth20";
import passportLocal from "passport-local";
import passport from "passport";
import passportJWT from "passport-jwt";
import TokenObj from "./interfaces/TokenObj";
import Admin from "./models/Admin";
import User from "./models/User";

export default () => {
    passport.use(
        "adminGoogleLogin",
        new googleOauth20.Strategy(
            {
                clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
                clientSecret: process.env.GOOGLE_LOGIN_CLIENT_SECRET,
                callbackURL: "/api/v1/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, callback) => {
                let admin = await Admin.model.findOne({ email: profile._json.email });
                if (admin) {
                    if (admin.status != "active") {
                        return callback("You are banned from the system", null);
                    }
                    await admin.updateOne({ googleID: profile.id });
                    callback(null, admin.id);
                } else {
                    // admin = await Admin.model.create({
                    //     googleID: profile.id,
                    //     image: profile._json.picture,
                    //     email: profile._json.email,
                    //     name: profile._json.given_name,
                    //     family: profile._json.family_name,
                    //     password: await Admin.hash(profile.id),
                    // });

                    // callback(null, admin.id);

                    callback("There is no user with that email in our system. Please make sure to register", null);
                }
            }
        )
    );

    passport.use(
        "adminLogin",
        new passportLocal.Strategy(
            {
                usernameField: "username",
                passwordField: "password",
                session: false,
            },
            async (username, password, callback) => {
                let admin = await Admin.model.findOne({ email: username });
                if (!admin) {
                    return callback("Invalide Username Or Password", null);
                }
                if (admin.status != "active") {
                    return callback("You are banned from the system", null);
                }

                const validate = await Admin.checkPass(admin.password, password);
                if (!validate) {
                    return callback("Invalide Username Or Password", null);
                }

                callback(null, admin.id);
            }
        )
    );

    passport.use(
        "adminAuthCheck",
        new passportJWT.Strategy(
            {
                secretOrKey: process.env.JWT_SECRET,
                jwtFromRequest: (req): string => {
                    let token = "";
                    if (req.headers["adminauthtoken"]) token = req.headers["adminauthtoken"].toString();
                    if (req.cookies["AdminAuthToken"]) token = req.cookies["AdminAuthToken"].toString();
                    return token;
                },
            },
            async (jwtPayload, callback) => {
                let admin = await Admin.model.findById(jwtPayload);
                if (admin) {
                    if (admin.status != "active") {
                        return callback(403, null);
                    }
                    callback(null, admin.id);
                } else {
                    callback(401, null);
                }
            }
        )
    );
};
