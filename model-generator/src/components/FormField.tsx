import React, { useState } from 'react';
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
  

  const [modelName, setModelName] = useState(''); 

  const handleAddField = () => {
    onAddField(model);

   
    setModel({
      modelname: model.modelname,
      name: '',
      type: 'String',
      isRequired: false,
      isPrimaryKey: false,
      defaultValue: '',
      size: '', 
    });
  };

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
      <button onClick={handleAddField}>Add field</button>
    </div>
  );
};

export default FormField;
