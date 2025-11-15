import express from "express";
import dotenv from "dotenv";
import { routes } from "./routes/index.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

// routes
for (const route in routes) {
  app.use("/" + routes[route].baseName, routes[route].router);
}

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
