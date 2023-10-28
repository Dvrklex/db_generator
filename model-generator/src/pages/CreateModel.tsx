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

  useEffect(() => {
    if (!isLogged && router) {
      router.push('/Login');
    }
  }, [isLogged, router]);

  if (!isLogged) {
    return (
      <div>
        {/*Proximamente: Informacion a mostrar para datos no autenticados*/}
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
        <div className="glitch-wrapper">
          <div className="glitch" data-text="Model creator">Model creator</div>
        </div>
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
