'use client'
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

interface Model {
  model_name: string;
  fields: Field[];
}

const Model: React.FC<CreateModelProps> = ({ isLogged, setIsLogged }) => {
  const { state: savedModel } = useModelContext();
  const router = useRouter();
  const [loadedModels, setLoadedModels] = useState<Model[]>([]);

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
              
                <strong className="font-semibold linkModel">Model name →</strong>{' '}
                {model.model_name}
              
            </Link>
          </li>
        ))}
      </ul>
    </div>
      <button
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  btmModelCreate"
        onClick={handleGenerateSequelize}
      >
        Create Migration
      </button>
      
      
    </div>
  );
};

export default Model;
