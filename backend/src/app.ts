import express from "express";
import bodyParser from "body-parser";
import { sequelize } from "./models";

const app = express();
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.get("/demos", async (req, res) => {
  // Implementation here
});

app.put("/frames/:id", async (req, res) => {
  // Implementation here
});

export default app;
