'use client'
import React,{useState} from 'react';
import { useModelContext } from './ModelContext';


interface Field {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
  defaultValue:string;
  size:any;
}

interface FieldListProps {
  fields: Field[];
}

const FieldList: React.FC<FieldListProps> = ({ fields }) => {
    const { state, dispatch } = useModelContext();
    const [currentFields, setCurrentFields] = useState([...fields]);

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
        setCurrentFields([]);

      } catch (error) {
        console.log(fields)
        console.error('Error:', error);
      }
    };
  
  

  return (
    <div className="list-container p-4 listContainer">
      <h2 className="text-xl font-semibold">Fields</h2>
      <ul className="list-disc pl-6 mt-2 listLIContainer">
      {fields
      .filter((field) => field.name && field.type)
      .map((field, index) => (
        <li key={index} className="mt-4 glitch-label">
          <strong>{field.name}</strong> → {field.type}
          {field.size && `, size: ${field.size}`}
          {field.defaultValue && `, default: ${field.defaultValue}`}
          {field.isPrimaryKey && ', primaryKey: true'}
          {field.isRequired && ', allowNull: false'}
        </li>
      ))}

      </ul>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded glitch-button SaveModelBTN"
        onClick={handleSaveModel}
      >
        Save Model
      </button>
    </div>
  
  );
};

export default FieldList;
