

const affordmedLogger = require('./affordmedLogger');
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const urlStore = new Map();

app.post("/shorturls", async (req, res) => {
  const url = req.body.url;
  let validity = req.body.validity;
  let shortcode = req.body.shortcode;
  if (!validity) validity = 30;
  let code = shortcode;
  if (!code) {
    code = uuidv4().slice(0, 6);
  }
  const expiry = new Date(Date.now() + validity * 60000);
  if (urlStore.has(code)) {
    await affordmedLogger({ stack: 'backend', level: 'warn', package: 'handler', message: `attempted to reuse shortcode: ${code}` });
    return res.status(409).json({ error: "shortcode already exists" });
  }
  urlStore.set(code, { url: url, expiry: expiry, created: new Date(), clicks: 0 });
  await affordmedLogger({ stack: 'backend', level: 'info', package: 'handler', message: `new short url made with code: ${code}` });
  res.status(201).json({
    shortLink: `http://localhost:3000/${code}`,
    expiry: expiry.toISOString()
  });
});

app.get("/shorturls/:shortcode", async (req, res) => {
  const code = req.params.shortcode;
  const data = urlStore.get(code);
  if (!data) {
    await affordmedLogger({ stack: 'backend', level: 'warn', package: 'handler', message: `stats requested for missing code: ${code}` });
    return res.status(404).json({ error: "shortcode not found" });
  }
  res.json({
    originalUrl: data.url,
    createdAt: data.created,
    expiry: data.expiry
  });
});


app.listen(3000, () => console.log(" running at http://localhost:3000"));
