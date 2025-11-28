import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import auth from "./utils/auth.js"
import { routes } from "./routes/index.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));

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
