'use client'
import React, { useState } from 'react';
import FormField from '../components/FormField';
import FieldList from '../components/FieldList';

const Home: React.FC = () => {
  const [fields, setFields] = useState([]);
  const [modelName, setModelName] = useState('');

  const handleAddField = (field) => {
    // Si el campo es el nombre del modelo, verifica si ya está en la lista
    if (field.name === modelName && fields.find((f) => f.name === modelName)) {
      return;
    }

    // Agrega el campo a la lista
    setFields([...fields, field]);

    // Si el campo es el nombre del modelo, actualiza el estado
    if (field.name !== modelName) {
      setModelName(field.name);
    }
  };

  return (
    <div className='page-tsx'>
      <h1>Generador de Modelos de Base de Datos</h1>
      <div className='model-container'>
      <FormField onAddField={handleAddField} />
      <FieldList fields={fields} />
      </div>
    </div>
  );
};

export default Home;
