import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "./generated/prisma/index.js";
import auth from "./utils/auth.js";
import { routes } from "./routes/index.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

app.use(passport.session());
passport.use(auth.strategy);
passport.serializeUser(auth.serializer);
passport.deserializeUser(auth.deserializer);

app.post(
  "/auth",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

app.get("/auth", (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    return res.redirect("/");
  });
});

// other routes
for (const route in routes) {
  app.use("/" + routes[route].baseName, routes[route].router);
}

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
