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

    if (!fs.existsSync(generatedModelsFolder)) {
      fs.mkdirSync(generatedModelsFolder);
    }

    for (const model of modelsData) {
      const modelAttributes = {};
      const modelOptions = {};
      const modelRelations = [];

      for (const field of model.fields) {
        modelAttributes[field.name] = {
          type: field.type,
          allowNull: !field.isRequired,
          primaryKey: field.isPrimaryKey,
        };
        if (field.relations) {
          modelRelations.push({
            targetModel: field.relations[0].targetModel,
            foreignKey: field.relations[0].foreignKey,
          });
        }
      }
      const currentModel = sequelize.define(model.model_name, modelAttributes, modelOptions);

      for (const relation of modelRelations) {
        console.log(`Definiendo relación para ${model.model_name} hacia ${relation.targetModel}`);

        const targetModel = sequelize.models[relation.targetModel];

        currentModel.belongsTo(targetModel, {
          foreignKey: relation.foreignKey,
          targetKey: targetModel.primaryKeyField, 
        });
      }
      function generateRelationsCode(relations) {
        const relationCode = relations.map(relation => {
          return `
      ${model.model_name}.belongsTo(${relation.targetModel}, {
        foreignKey: '${relation.foreignKey}',
        targetKey: 'id',
      });`;
        }).join('\n');
      
        return `
      // Definir relaciones
      ${relationCode}
      `;
      }
      const modelCode = `const { Sequelize, DataTypes, Model } = require('sequelize');

        class ${model.model_name} extends Model {}

        ${model.model_name}.init(${JSON.stringify(modelAttributes, null, 2)}, {
          sequelize,
          modelName: '${model.model_name}',
        });

        ${model.relations ? generateRelationsCode(model.relations) : ''}

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

      if (fieldData.relations) {
        existingModel.relations = fieldData.relations;
      }
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
        relations: fieldData.relations || [],
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


app.get('/get/model/:modelName', (req, res) => {
  const modelName = req.params.modelName;
  const modelFileName = `${generatedModelsFolder}/${modelName}.js`;

  try {
    if (fs.existsSync(modelFileName)) {
      const modelCode = fs.readFileSync(modelFileName, 'utf-8');
      res.json({ code: modelCode });
    } else {
      console.error(`El archivo del modelo ${modelName} no existe.`);
      res.status(404).json({ error: 'Modelo no encontrado' });
    }
  } catch (error) {
    console.error(`Error al leer el código del modelo ${modelName}:`, error);
    res.status(500).json({ error: 'Error al obtener el código Sequelize del modelo' });
  }
});



app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
