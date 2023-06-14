import express from "express";

const app = express();

app.get("/", (req, res) => {
  return res.json({ message: "hello buddy" });
});

export default app;
