import express from "express";
import "./infra/providers/kafka/consumers"

const PORT = process.env.PORT ?? 3000;
const app = express();
app.use(express.json());

app.listen(PORT, () =>
  console.log("HTTP server orders running on port " + PORT)
);
