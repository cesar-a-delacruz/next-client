import express from "express";
import dotenv from "dotenv";
import { default as routes } from "./routes/index.js";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/appointment", routes.appointment);
app.use("/business", routes.business);
app.use("/client", routes.client);
app.use("/service", routes.service);

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
