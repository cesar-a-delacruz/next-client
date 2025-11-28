import { Strategy } from "passport-local";
import { compare } from "bcryptjs";
import { controllers } from "../controllers/index.js";

export default {
    strategy: new Strategy(async (username, password, done) => {
        try {
            const user = await controllers.user.findByPhone(username);
            if (!user) {
                return done(null, false, { message: "Incorrect username" });
            }
            const match = await compare(password, user.password);
            if (!match) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }),
    serializer(user, done) { return done(null, user.id); },
    async deserializer(id, done) {
        try {
            const user = await controllers.user.findById(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    }
}