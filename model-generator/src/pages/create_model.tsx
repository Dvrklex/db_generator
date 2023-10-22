'use client'
import React, { useState } from 'react';
import FormField from '../components/FormField';
import FieldList from '../components/FieldList';

const CreateModel: React.FC = () => {
  const [fields, setFields] = useState([] as any[]); 
  const [modelName, setModelName] = useState('');

  const handleAddField = (field: any) => { 
    if (field.name === modelName && fields.find((f) => f.name === modelName)) {
      return;
    }

    setFields([...fields, field]);

    if (field.name !== modelName) {
      setModelName(field.name);
    }
  };

  return (
    <div>
      <h1>Página para crear modelos o tablas</h1>
      <div className="page-tsx">
        <h1>Generador de Modelos de Base de Datos</h1>
        <div className="model-container">
          <FormField onAddField={handleAddField} />
          <FieldList fields={fields} />
        </div>
      </div>
      {/* Tu contenido para crear modelos aquí */}
    </div>
  );
};

export default CreateModel;
