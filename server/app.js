import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.urlencoded({ extended: true }));

app.listen(process.env.APP_PORT, (error) => {
  if (error) throw error;
  console.log("running...");
});
