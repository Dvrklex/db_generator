const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Ruta para guardar un modelo en formato JSON
app.post('/create_model', (req, res) => {
  const { model } = req.body;
  const models = JSON.parse(fs.readFileSync('models.json'));
  models[model.name] = model;
  fs.writeFileSync('models.json', JSON.stringify(models));

  res.json({ message: 'Modelo guardado correctamente' });
});

// Ruta para obtener modelos en formato JSON
app.get('/models', (req, res) => {
  const models = JSON.parse(fs.readFileSync('models.json'));
  const modelArray = Object.values(models);
  res.json(modelArray);
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
