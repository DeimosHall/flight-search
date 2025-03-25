import Metrics from './Metrics';
import TodosFilter from './TodosFilter';
import TodosTable from './TodosTable';
import {
  Box,
  Button,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import NewTodoModal from './NewTodoModal';
import { todos } from '../api/todos';
import { Todo, TodosMetrics } from '../types';
import EditTodoModal from './EditTodoModal';
import { useTodosFilter } from '../context/TodosFilterContext';
import TodosPagination from './Pagination';

const TodoApp = () => {
  const [todoToEdit, setTodoToEdit] = useState<Todo | undefined>(undefined);
  const [todosList, setTodosList] = useState<Todo[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isNewTodoModalOpen, setIsNewTodoModalOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const { todosFilterAttributes } = useTodosFilter();
  const [metrics, setMetrics] = useState<TodosMetrics>({ pages: 0, avgTime: 0, avgTimeLow: 0, avgTimeMedium: 0, avgTimeHigh: 0 });

  const fetchTodos = useCallback(async () => {
    await todos.getAll(todosFilterAttributes)
      .then((data) => {
        setTodosList(data.todos);
        setMetrics(data.metrics);
      })
      .catch(() => setServerError('Error fetching data'));
  }, [setMetrics, todosFilterAttributes]);

  useEffect(() => {
    fetchTodos();
  }, [todosFilterAttributes, fetchTodos]);

  const handleNewTodoModalOpen = () => {
    setIsNewTodoModalOpen(true);
  };

  const handleNewTodoModalClose = async () => {
    setIsNewTodoModalOpen(false);
    setServerError(null);
  };

  const handleEditTodoModalOpen = (todo: Todo) => {
    setIsEditTodoModalOpen(true);
    setTodoToEdit(todo);
  }

  const handleEditTodoModalClose = () => {
    setIsEditTodoModalOpen(false);
  }

  const handleTodosListChange = async () => {
    await fetchTodos();
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TodosFilter />
      <Button variant="contained" onClick={handleNewTodoModalOpen} style={{ maxWidth: '150px' }} sx={{ textTransform: 'capitalize' }}>
        + New To Do
      </Button>
      {serverError ? (
        <Box sx={{ color: 'red' }}>{serverError}</Box>
      ) : (
        <TodosTable todosList={todosList} onTodosListChange={handleTodosListChange} onTodoEdit={handleEditTodoModalOpen} />
      )}
      <TodosPagination pages={metrics.pages} />
      <Metrics metrics={metrics} />
      <NewTodoModal isOpen={isNewTodoModalOpen} handleClose={handleNewTodoModalClose} onTodoAdded={handleTodosListChange} />
      <EditTodoModal isOpen={isEditTodoModalOpen} handleClose={handleEditTodoModalClose} onTodoEdited={handleTodosListChange} todo={todoToEdit} />
    </Box>
  );
};

export default TodoApp;