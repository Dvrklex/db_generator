'use client'

import React from 'react';
import './styles.css'
interface Field {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
}

interface FieldListProps {
  fields: Field[];
}

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
  return (
    <div className="list-container">
      <h2>Fields:</h2>
      <ul>
        {fields.map((field, index) => (
          <li key={index}>
            <strong>{field.name}</strong>: {field.type}
            {field.isPrimaryKey && '(primary_key:True)'}
            {field.isRequired && '(required o not null:True)'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FieldList;
