import { Url } from "../Models/Url.js";
import shortid from "shortid";

export const shortUrl = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();
  const shortUrl = `http://localhost:1000/${shortCode}`;

  try {
    const newUrl = new Url({
      shortCode,
      longUrl
    });

    await newUrl.save();
    res.render("index.ejs", { shortUrl });
  } catch (err) {
    console.error("Save Error:", err);
    res.status(500).send("Error saving URL: " + err.message);
  }
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  try {
    const originalUrl = await Url.findOne({ shortCode });
    if (originalUrl) {
      let targetUrl = originalUrl.longUrl;
      // Protocol check (http:// or https://)
      if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
        targetUrl = 'http://' + targetUrl;
      }
      res.redirect(targetUrl);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};