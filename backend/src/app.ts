import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { sequelize, Demo, Frame } from "./models";

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.set("sequelize", sequelize);
app.set("models", sequelize.models);

app.get("/demos", async (req, res) => {
  try {
    const demos = await Demo.findAll({
      include: [{ model: Frame, as: "frames" }],
    });
    res.status(200).json(demos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar os Demos" });
  }
});

app.get("/frames/:id", async (req, res) => {
  try {
    const frame = await Frame.findByPk(req.params.id, {
      include: [{ model: Demo, as: "demo" }],
    });
    if (frame) {
      res.status(200).json(frame);
    } else {
      res.status(404).json({ error: "Frame não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o Frame" });
  }
});

app.put("/frames/:id", async (req, res) => {
  try {
    const frame = await Frame.findByPk(req.params.id);
    if (frame) {
      frame.html = req.body.html;
      await frame.save();
      res.status(200).json({ message: "Frame atualizado com sucesso" });
    } else {
      res.status(404).json({ error: "Frame não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar o Frame" });
  }
});

export default app;
