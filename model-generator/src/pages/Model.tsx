'use client'
import React, { useEffect, useState } from 'react';
import { useModelContext } from '../components/ModelContext';
import { useRouter } from 'next/router';
import Footer from '../components/Footer';


interface Field {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
}
interface CreateModelProps {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

interface Model {
  model_name: string;
  fields: Field[];
}

const Model: React.FC<CreateModelProps>= ({ isLogged, setIsLogged}) => {
  const { state: savedModel } = useModelContext();
  const router = useRouter();
  const [loadedModels, setLoadedModels] = useState<Model[]>([]);
  console.log("User isLogged??", isLogged);

  useEffect(() => {
    if (!isLogged && router) {
      router.push('/Login');
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return null;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    fetch('http://localhost:3001/models')
      .then((response) => response.json())
      .then((data) => {
        setLoadedModels(data);
      });
  }, []);
  const handleGenerateSequelize = async () => {
    try {
      const response = await fetch('http://localhost:3001/generate/model', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
      } else {
        console.error('Error en la generación de Sequelize.');
      }
    } catch (error) {
      console.error('Error en la generación de Sequelize:', error);
    }
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Página para ver modelos generados</h1>
      <h2 className="text-xl font-semibold mt-4">Modelo Guardado:</h2>
      <ul className="list-disc pl-6 mt-2">
        {savedModel.map((field, index) => (
          <li key={index} className="mt-1">
            <strong>{field.name}</strong>: {field.type}
            {field.isPrimaryKey && ', primaryKey: true'}
            {field.isRequired && ', allowNull: false'}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-4">Modelos Cargados desde el Servidor:</h2>
      <ul className="list-disc pl-6 mt-2">
        {loadedModels.map((model, index) => (
          <li key={index} className="mt-1">
            <strong className="font-semibold">Nombre del modelo:</strong> {model.model_name}
            {model.fields && model.fields.length > 0 ? (
              <ul className="list-disc pl-6 mt-2">
                {model.fields.map((field, fieldIndex) => (
                  <li key={fieldIndex} className="mt-1">
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
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleGenerateSequelize}
      >
        Generar Sequelize
      </button>
      <Footer/>

      
    </div>
  );
};

export default Model;
