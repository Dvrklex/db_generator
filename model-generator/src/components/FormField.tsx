import React, { useState, useEffect } from 'react';
import './styles.css';

interface FormFieldProps {
  onAddField: (field: any) => void;
}

const FormField: React.FC<FormFieldProps> = ({ onAddField }) => {
  const [model, setModel] = useState({
    modelname: '',
    name: '',
    type: 'String',
    isRequired: false,
    isPrimaryKey: false,
    defaultValue: '',
    size: '', 
  });
  const [relation, setRelation] = useState({
    targetModel: '',
    foreignKey: '',
  });
  const [modelsList, setModelsList] = useState<string[]>([]);
  const [selectedModelAttributes, setSelectedModelAttributes] = useState<string[]>([]);


  useEffect(() => {
    // Obtén la lista de modelos disponibles al cargar el componente
    fetch('http://localhost:3001/models')
      .then((response) => response.json())
      .then((data) => {
        setModelsList(data.map((model: any) => model.model_name));
      });
  }, []);
  useEffect(() => {
    if (relation.targetModel) {
      fetch(`http://localhost:3001/models/${relation.targetModel}`)
        .then((response) => response.json())
        .then((data) => {
          setSelectedModelAttributes(data.fields.map((field: any) => field.name));
        });
    }
  }, [relation.targetModel]);
  const [modelName, setModelName] = useState(''); 

  const handleAddField = () => {
    onAddField(model);
    onAddField({ ...model, relations: [{ ...relation }] });
   
    setModel({
      modelname: model.modelname,
      name: '',
      type: 'String',
      isRequired: false,
      isPrimaryKey: false,
      defaultValue: '',
      size: '', 
    });
    setRelation({
      targetModel: '',
      foreignKey: '',
    });
  };
  // const handleAddRelation = () => {
  //   // Agrega la relación al modelo
   

  //   // Reinicia el estado de la relación
    
  // };
  return (
    <div className="form-container">
      <div>
        <label htmlFor="tableName">Model name → {model.modelname}</label>
        <input
          type="text"
          id="tableName"
          value={model.modelname}
          onChange={(e) => setModel({ ...model, modelname: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="fieldName">Field name</label>
        <input
          type="text"
          id="fieldName"
          value={model.name}
          onChange={(e) => setModel({ ...model, name: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="fieldType">Field type</label>
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
        <label htmlFor="size">Size</label>
        <input
          type="text"
          id="size"
          value={model.size}
          onChange={(e) => setModel({ ...model, size: e.target.value })}
        />
      </div>
      <div>
        <label htmlFor="size">Default value</label>
        <input
          type="text"
          id="defaultValue"
          value={model.defaultValue}
          onChange={(e) => setModel({ ...model, defaultValue: e.target.value })}
        />
      </div>
      <div className='checkboxContainer'>
        <label>
          Not NULL
          <input
            type="checkbox"
            checked={model.isRequired}
            onChange={() => setModel({ ...model, isRequired: !model.isRequired })}
          />
        </label>
        <label>
          Primary Key
          <input
            type="checkbox"
            checked={model.isPrimaryKey}
            onChange={() => setModel({ ...model, isPrimaryKey: !model.isPrimaryKey })}
          />
        </label>
      </div>
      
    <div>
        <label htmlFor="relationTargetModel">Target Model</label>
        <select
          id="relationTargetModel"
          value={relation.targetModel}
          onChange={(e) => setRelation({ ...relation, targetModel: e.target.value })}
        >
          <option value="">Select Target Model</option>
          {modelsList.map((modelName) => (
            <option key={modelName} value={modelName}>
              {modelName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="relationForeignKey">Foreign Key</label>
        <select
          id="relationForeignKey"
          value={relation.foreignKey}
          onChange={(e) => setRelation({ ...relation, foreignKey: e.target.value })}
        >
          <option value="">Select Foreign Key</option>
          {selectedModelAttributes.map((attribute) => (
            <option key={attribute} value={attribute}>
              {attribute}
            </option>
          ))}
        </select>
        {/* <button onClick={handleAddRelation}>Add relation</button> */}

      </div>
      <button onClick={handleAddField}>Add field</button>
    </div>
  );
};

export default FormField;
