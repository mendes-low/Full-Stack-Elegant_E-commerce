import passport from "passport";
import { Strategy } from "passport-local";
import { comparePassword } from "./hash.mjs";
import UserRepository from "../repositories/User.mjs";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const findUser = await UserRepository.getUserById(id);
        if (!findUser) throw new Error("User Not Found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

export default passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await UserRepository.getUserByUsername(username);
            if (!findUser) throw new Error("User Not Found");
            if (!(await comparePassword(password, findUser.password)))
                throw new Error("Bad credentials");
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);
