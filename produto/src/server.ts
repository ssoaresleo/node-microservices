import express from "express";

const PORT = process.env.PORT ?? 3333;
const app = express();
app.use(express.json());

app.listen(PORT, () =>
  console.log("HTTP server product running on port " + PORT)
);
