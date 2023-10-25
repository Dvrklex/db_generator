const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

let modelsData = loadModels();

function loadModels() {
  try {
    const data = fs.readFileSync('models.json');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe o no se puede leer, se inicializa como un arreglo vacío
    return [];
  }
}

app.post('/create_model', (req, res) => {
  console.log('Solicitud POST recibida en /create_model:', req.body);

  // Obtén los modelos existentes desde modelsData
  const existingModels = [...modelsData];

  req.body.forEach((model) => {
    const { modelname, ...fieldData } = model;

    // Busca si ya existe un modelo con el mismo nombre
    const existingModel = existingModels.find((m) => m.model_name === modelname);

    if (existingModel) {
      // Agrega los campos al modelo existente
      existingModel.fields.push({
        name: fieldData.name,
        type: fieldData.type,
        isRequired: fieldData.isRequired,
        isPrimaryKey: fieldData.isPrimaryKey,
      });
    } else {
      // Si no existe, crea un nuevo modelo
      existingModels.push({
        model_name: modelname,
        fields: [
          {
            name: fieldData.name,
            type: fieldData.type,
            isRequired: fieldData.isRequired,
            isPrimaryKey: fieldData.isPrimaryKey,
          },
        ],
      });
    }
  });

  // Guarda los modelos actualizados en modelsData
  modelsData = existingModels;

  // Sobrescribe el archivo models.json con los modelos actualizados
  fs.writeFileSync('models.json', JSON.stringify(modelsData, null, 2));

  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Modelo(s) guardado(s) correctamente' });
});

// Ruta para obtener modelos en formato JSON
app.get('/models', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(modelsData);
});

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
