import express from "express";
import { router } from "./infra/routes";
import "./infra/provider/kafka/consumer/index";

const PORT = process.env.PORT ?? 3001;
const app = express();
app.use(express.json());
app.use(router);

app.listen(PORT, () =>
  console.log("HTTP server client running on port " + PORT)
);
