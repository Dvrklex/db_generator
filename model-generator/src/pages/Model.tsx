// 'use client'
import React, { useEffect, useState } from 'react';
import { useModelContext } from '../components/ModelContext';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

interface ModelData {
  model_name: string;
  fields: Field[];
}

const ModelComponent: React.FC<CreateModelProps> = ({ isLogged, setIsLogged }) => {
  const { state: savedModel } = useModelContext();
  const router = useRouter();
  const [loadedModels, setLoadedModels] = useState<ModelData[]>([]);
  const [selectedModel, setSelectedModel] = useState<ModelData | null>(null);
  const [sequelizeCode, setSequelizeCode] = useState<string | null>(null);

  useEffect(() => {
    if (!isLogged && router) {
      router.push('/Login');
    }
  }, [isLogged, router]);

  useEffect(() => {
    if (isLogged) {
      fetch('http://localhost:3001/models')
        .then((response) => response.json())
        .then((data) => {
          setLoadedModels(data);
        });
    }
  }, [isLogged]);

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

  const handleViewCode = async (model: ModelData) => {
    try {
      const response = await fetch(`http://localhost:3001/get/model/${model.model_name}`);
  
      if (response.ok) {
        const data = await response.json();
        setSelectedModel(model);
        setSequelizeCode(data.code);
      } else {
        const errorMessage = await response.text(); // Obtener el mensaje de error
        console.error('Error al obtener el código Sequelize:', errorMessage);
      }
    } catch (error) {
      console.error('Error al obtener el código Sequelize:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="glitch-wrapper">
        <div className="glitch" data-text="My Models">
          My Models
        </div>
      </div>
      <div className="modelContainer">
        <ul className="pl-6 mt-2">
          {loadedModels.map((model, index) => (
            <li key={index} className="mt-1 listNameModel">
              <Link href={`/model/${model.model_name}`}>
                <strong className="font-semibold linkModel">
                  Model name → {model.model_name}
                </strong>
              </Link>
              <button
                className="ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleViewCode(model)}
              >
                Ver Código
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btmModelCreate"
        onClick={handleGenerateSequelize}
      >
        Create Migration
      </button>
      {selectedModel && (
        <div className="mt-4 source-code">
          <h2 className="text-xl font-semibold mb-2">Sequelize Code</h2>
          <pre>{sequelizeCode}</pre>
        </div>
      )}
    </div>
  );
};

export default ModelComponent;
