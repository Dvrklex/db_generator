'use client'

import React, { useState } from 'react';
import './styles.css'
const FormField: React.FC = ({ onAddField }) => {
  const [model, setModel] = useState({
    modelname: '',
    name: '',
    type: 'String',
    isRequired: false,
    isPrimaryKey: false,
  });
  const [modelName, setModelName] = useState(''); // Estado para el nombre del modelo

  const handleAddField = () => {
    // Aquí debes manejar la lógica para agregar un campo a la lista
    onAddField(model);
    setModel({
      name: '',
      type: 'String',
      isRequired: false,
      isPrimaryKey: false,
    });
    setModelName(model.modelname);

  };

  return (
    <div className="form-container">
      <h2>Table Name: {modelName}</h2>
      <div>
        <label htmlFor="tableName">Nombre del Modelo</label>
        <input
          type="text"
          id="tableName"
          value={model.modelname}
          onChange={(e) => setModel({ ...model, modelname: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="fieldName">Nombre del Campo</label>
        <input
          type="text"
          id="fieldName"
          value={model.name}
          onChange={(e) => setModel({ ...model, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="fieldType">Tipo de dato</label>
        <select
          id="fieldType"
          value={model.type}
          onChange={(e) => setModel({ ...model, type: e.target.value })}
        >
          <option value="String">String</option>
          <option value="Integer">Integer</option>
          <option value="Boolean">Boolean</option>
          <option value="TIMESTAMP">TIMESTAMP</option>
        </select>
      </div>
      <div>
        <label>
          Requerido/Not NULL
          <input
            type="checkbox"
            checked={model.isRequired}
            onChange={() => setModel({ ...model, isRequired: !model.isRequired })}
          />
        </label>
      </div>
      <div>
        <label>
          Primary Key
          <input
            type="checkbox"
            checked={model.isPrimaryKey}
            onChange={() => setModel({ ...model, isPrimaryKey: !model.isPrimaryKey })}
          />
        </label>
      </div>
      <button onClick={handleAddField}>Agregar Campo</button>
    </div>
  );
};

export default FormField;
