const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
const generatedModelsFolder = 'generatedModels';  

let modelsData = loadModels();

function loadModels() {
  try {
    const data = fs.readFileSync('models.json');
    return JSON.parse(data);
  } catch (error) {
    //* Si el archivo no existe o no se puede leer, se inicializa como un arreglo vacío
    return [];
  }
}

app.post('/generate/model', async (req, res) => {
  try {
    const sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: 'database.sqlite',
    });

    // Crear la carpeta generatedModels si no existe
    if (!fs.existsSync(generatedModelsFolder)) {
      fs.mkdirSync(generatedModelsFolder);
    }

    for (const model of modelsData) {
      const modelAttributes = {};
      for (const field of model.fields) {
        modelAttributes[field.name] = {
          type: field.type,
          allowNull: !field.isRequired,
          primaryKey: field.isPrimaryKey,
        };
      }

      sequelize.define(model.model_name, modelAttributes);

      const modelCode = `const { Sequelize, DataTypes } = require('sequelize');

        const ${model.model_name} = (sequelize) => {
          return sequelize.define('${model.model_name}', ${JSON.stringify(modelAttributes, null, 2)});
        };

        module.exports = ${model.model_name};`;

      fs.writeFileSync(`${generatedModelsFolder}/${model.model_name}.js`, modelCode);
            }

    await sequelize.sync({ force: true });

    console.log('Migraciones exitosas.');
    res.json({ message: 'Migraciones exitosas' });
  } catch (error) {
    console.error('Error al generar migraciones y archivos de modelos:', error);
    res.status(500).json({ error: 'Error al generar migraciones y archivos de modelos' });
  }
});

app.post('/create_model', (req, res) => {
  console.log('Solicitud POST recibida en /create_model:', req.body);

  const existingModels = [...modelsData];

  req.body.forEach((model) => {
    const { modelname, ...fieldData } = model;

    const existingModel = existingModels.find((m) => m.model_name === modelname);

    if (existingModel) {
      existingModel.fields.push({
        name: fieldData.name,
        type: fieldData.type,
        isRequired: fieldData.isRequired,
        isPrimaryKey: fieldData.isPrimaryKey,
        defaultValue: fieldData.defaultValue, 
        size: fieldData.size, 
      });
    } else {
      existingModels.push({
        model_name: modelname,
        fields: [
          {
            name: fieldData.name,
            type: fieldData.type,
            isRequired: fieldData.isRequired,
            isPrimaryKey: fieldData.isPrimaryKey,
            defaultValue: fieldData.defaultValue, 
            size: fieldData.size, 
          },
        ],
      });
    }
  });

  modelsData = existingModels;

  fs.writeFileSync('models.json', JSON.stringify(modelsData, null, 2));

  res.setHeader('Content-Type', 'application/json');
  res.json({ message: 'Modelo(s) guardado(s) correctamente' });
});


app.get('/models', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json(modelsData);
});


app.get('/models/:modelName', (req, res) => {
  const modelName = req.params.modelName;
  const model = modelsData.find((m) => m.model_name === modelName);

  if (model) {
    res.json(model);
  } else {
    res.status(404).json({ error: 'Modelo no encontrado' });
  }
});


app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
