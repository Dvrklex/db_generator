import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Define el tipo Field
type Field = {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
};

// Define un estado inicial vacío
const initialState: Field[] = [];

// Define las acciones que modificarán el estado
type Action = { type: 'SAVE_MODEL'; payload: Field[] };

// Define el reducer para manejar las acciones
const reducer = (state: Field[], action: Action): Field[] => {
  switch (action.type) {
    case 'SAVE_MODEL':
      return action.payload;
    default:
      return state;
  }
};

// Crea el contexto
const ModelContext = createContext<{ state: Field[]; dispatch: React.Dispatch<Action> } | undefined>(undefined);
interface ModelProviderProps {
  children: ReactNode;
}

// Proveedor del contexto
const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ModelContext.Provider value={{ state, dispatch }}>{children}</ModelContext.Provider>;
};

// Función personalizada para acceder al contexto
const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModelContext debe utilizarse dentro de un ModelProvider');
  }
  return context;
};

export { ModelProvider, useModelContext };
