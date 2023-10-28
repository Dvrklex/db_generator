import { useRouter } from 'next/router';
import { JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, useEffect, useState } from 'react';
import Model from '../Model'

interface Field {
    name: string;
    type: string;
    isPrimaryKey: boolean;
    isRequired: boolean;
  }
interface CreateModelProps {
  isLogged: boolean;
  setIsLogged: (value: boolean) => void;
}
const ModelDetails: React.FC<CreateModelProps> = ({ isLogged, setIsLogged })=> {
  const router = useRouter();
  const { modelName } = router.query;

  const [modelData, setModelData] = useState<Model | null>(null);
useEffect(() => {
    if (!isLogged && router) {
    router.push('/Login');
    }
}, [isLogged, router]);

  useEffect(() => {
    // *Realiza una solicitud para obtener los detalles del modelo utilizando el nombre del modelo
    if (modelName) {
      fetch(`http://localhost:3001/models/${modelName}`)
        .then((response) => response.json())
        .then((data) => {
          setModelData(data);
        });
    }
  }, [modelName]);

  return (
    <div className="container mx-auto p-4">
  {modelData ? (
<>
    <div className="glitch-wrapper">
        <div className="glitch" data-text={modelData.model_name}>{modelData.model_name}</div>
    </div>
      <ul className="pl-6 mt-2">
        {modelData.fields.map((field: Field, fieldIndex: number) => (
          <li key={fieldIndex} className="mt-1 listNameModel">
            <strong>{field.name}</strong> → {field.type}
            {field.isPrimaryKey && ', primaryKey: true'}
            {field.isRequired && ', allowNull: false'}
          </li>
        ))}
      </ul>
    </>
  ) : (
    <p className="subTitle">Loading...</p>
  )}
</div>


  );
};

export default ModelDetails;
