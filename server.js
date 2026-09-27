import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';
import { shortUrl, getOriginalUrl } from './Controllers/url.js';

const app = express();

app.use(express.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGO_URI, { dbName: "NodeJs_Mastery_Course" })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.log("DB Connection Error:", err));
app.get("/", (req, res) => {
  res.render("index.ejs", { shortUrl: null });
});

app.post("/short", shortUrl);

app.get("/:shortCode", getOriginalUrl);

const PORT = 1000;
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}`));