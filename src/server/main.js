import express from "express";
import ViteExpress from "vite-express";
import * as db from "./database/index.js";
import { fsAdapter } from "./database/fsAdapter.js";

const app = express();

//db setup middleware
app.use(async (req, res,  next) => {
  db.useAdapter(new fsAdapter(["user"]));
  await db.boot();
  next();
})

app.get("/test/:table", async (req, res) => {
  res.send(db.boot());
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
