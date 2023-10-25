'use client'
import React, { useEffect, useState } from 'react';
import { useModelContext } from '../components/ModelContext';

interface Field {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
}

interface Model {
  model_name: string;
  fields: Field[];
}

const Model: React.FC = () => {
  const { state: savedModel } = useModelContext();
  const [loadedModels, setLoadedModels] = useState<Model[]>([]);

  useEffect(() => {
    // Cargar los modelos desde el servidor
    fetch('http://localhost:3001/models')
      .then((response) => response.json())
      .then((data) => {
        setLoadedModels(data);
      });
  }, []);

  return (
    <div>
      <h1>Página para ver modelos generados</h1>
      <h2>Modelo Guardado:</h2>
      <ul>
        {savedModel.map((field, index) => (
          <li key={index}>
            <strong>{field.name}</strong>: {field.type}
            {field.isPrimaryKey && ', primaryKey: true'}
            {field.isRequired && ', allowNull: false'}
          </li>
        ))}
      </ul>
      <h2>Modelos Cargados desde el Servidor:</h2>
      <ul>
        {loadedModels.map((model, index) => (
          <li key={index}>
            <strong>Nombre del modelo:</strong> {model.model_name}
            {model.fields && model.fields.length > 0 ? (
              <ul>
                {model.fields.map((field, fieldIndex) => (
                  <li key={fieldIndex}>
                    <strong>{field.name}</strong>: {field.type}
                    {field.isPrimaryKey && ', primaryKey: true'}
                    {field.isRequired && ', allowNull: false'}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Sin campos definidos</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Model;
