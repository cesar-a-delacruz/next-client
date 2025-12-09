import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { routes } from "./routes/index.js";
import authenticationMiddleware from "./middlewares/authenticationMiddleware.js";

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));

// other routes
for (const route in routes) {
  app.use("/" + routes[route].baseName, routes[route].router);
}

app.post("/auth", authenticationMiddleware);

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
