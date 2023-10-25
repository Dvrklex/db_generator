'use client'
import React,{useState} from 'react';
import { useModelContext } from './ModelContext';


interface Field {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
}

interface FieldListProps {
  fields: Field[];
}

// const FieldList: React.FC<FieldListProps> = ({ fields }) => {
//   const { state, dispatch } = useModelContext();

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
    const { state, dispatch } = useModelContext();

    const handleSaveModel = async () => {
      try {
        const response = await fetch('http://localhost:3001/create_model', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fields),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.log(fields)
        console.error('Error:', error);
      }
    };
  
  

  return (
    <div className="list-container">
      <h2>Fields:</h2>
      <ul>
        {fields
          .filter((field) => field.name && field.type)
          .map((field, index) => (
            <li key={index}>
              <strong>{field.name}</strong>: {field.type}
              {field.isPrimaryKey && ', primaryKey: true'}
              {field.isRequired && ', allowNull: false'}
            </li>
          ))}
      </ul>
      <button onClick={handleSaveModel}>Guardar Modelo</button>
    </div>
  );
};

export default FieldList;
