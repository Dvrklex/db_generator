'use client'
import React, { useState, useEffect, ReactNode } from 'react';
import FormField from '../components/FormField';
import FieldList from '../components/FieldList';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';



interface CreateModelProps {
  children: ReactNode;
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}

const CreateModel: React.FC<CreateModelProps> = ({ isLogged, setIsLogged }) => {
  const [fields, setFields] = useState([] as any[]);
  const [modelName, setModelName] = useState('');
  const router = useRouter();
  console.log("User isLogged??", isLogged);

  // Mueve este useEffect fuera del condicional
  useEffect(() => {
    if (!isLogged && router) {
      router.push('/Login');
    }
  }, [isLogged, router]);

  // Mueve este condicional al cuerpo del componente, no en el retorno
  if (!isLogged) {
    return (
      <div>
        {/* Lo que quieras mostrar para usuarios no autenticados */}
      </div>
    );
  }

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
      <div className="page-tsx">
        <h1>Generador de Modelos de Base de Datos</h1>
        <div className="model-container">
          <FormField onAddField={handleAddField} />
          <FieldList fields={fields} />
        </div>
      </div>
      <Footer />
    </div>
  );
};


export default CreateModel;
