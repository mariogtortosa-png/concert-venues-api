import express from "express";

//Variables
const app = express();
const PORT = 3000;

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando por el puerto ${PORT}`);
});
