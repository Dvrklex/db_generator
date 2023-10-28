import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Field = {
  name: string;
  type: string;
  isRequired: boolean;
  isPrimaryKey: boolean;
};

const initialState: Field[] = [];

type Action = { type: 'SAVE_MODEL'; payload: Field[] };

const reducer = (state: Field[], action: Action): Field[] => {
  switch (action.type) {
    case 'SAVE_MODEL':
      return action.payload;
    default:
      return state;
  }
};

const ModelContext = createContext<{ state: Field[]; dispatch: React.Dispatch<Action> } | undefined>(undefined);
interface ModelProviderProps {
  children: ReactNode;
}

const ModelProvider: React.FC<ModelProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <ModelContext.Provider value={{ state, dispatch }}>{children}</ModelContext.Provider>;
};

const useModelContext = () => {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error('useModelContext debe utilizarse dentro de un ModelProvider');
  }
  return context;
};

export { ModelProvider, useModelContext };
