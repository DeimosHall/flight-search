import React, { createContext, useContext, useState } from 'react';
import { TodosFilterAttributes } from '../types';

interface TodosFilterContextType {
  todosFilterAttributes: TodosFilterAttributes;
  setTodosFilterAttributes: React.Dispatch<React.SetStateAction<TodosFilterAttributes>>;
}

const TodosFilterContext = createContext<TodosFilterContextType>({
  todosFilterAttributes: {
    page: 0,
    size: 10,
    sortBy: '',
    sortOrder: '',
    done: null,
    text: '',
    priority: '',
  },
  setTodosFilterAttributes: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodoListContextProvider: React.FC<Props> = ({ children }) => {
  const [todosFilterAttributes, setTodosFilterAttributes] = useState<TodosFilterAttributes>({
    page: 0,
    size: 10,
    sortBy: '',
    sortOrder: '',
    done: null,
    text: '',
    priority: '',
  });

  return (
    <TodosFilterContext.Provider value={{ todosFilterAttributes, setTodosFilterAttributes }}>
      {children}
    </TodosFilterContext.Provider>
  );
};

export const useTodosFilter = () => {
  const context = useContext(TodosFilterContext);

  if (!context) {
    throw new Error('useTodosFilter must be used within a TodoListContextProvider');
  }

  return context;
};