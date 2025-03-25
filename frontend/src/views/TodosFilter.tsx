import { Box, FormControl, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import * as React from 'react';
import { useTodosFilter } from '../context/TodosFilterContext';

const TodosFilter: React.FC = () => {
  const [newTodoText, setNewTodoText] = React.useState('');
  const [newTodoPriority, setNewTodoPriority] = React.useState('All');
  const [newTodoState, setNewTodoState] = React.useState('All');
  const { setTodosFilterAttributes } = useTodosFilter();

  // handleSearch = async () => {
  //   await todos.getAll(newTodoText, newTodoPriority, newTodoState)
  //     .then((data) => setTodosList(data))
  //     .catch(() => setServerError('Error fetching data'));
  // }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoText(e.target.value);
    setTodosFilterAttributes(prev => ({ ...prev, text: e.target.value }));
  };

  const handlePriorityChange = (e: SelectChangeEvent<string>) => {
    setNewTodoPriority(e.target.value);
    setTodosFilterAttributes(prev => ({ ...prev, priority: e.target.value }));
  };

  const handleStateChange = (e: SelectChangeEvent<string>) => {
    setNewTodoState(e.target.value as string);
    setTodosFilterAttributes(prev => ({ ...prev, done: e.target.value === 'Done' ? true : e.target.value === 'Undone' ? false : null }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderColor: 'primary.main', border: 1, p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <p style={{ minWidth: '60px' }}>Name</p>
        <TextField
          label="Text"
          value={newTodoText}
          onChange={(e) => handleTextChange(e)}
          fullWidth
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <p style={{ minWidth: '60px' }}>Priority</p>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={newTodoPriority}
              onChange={(e) => handlePriorityChange(e)}
              label=""
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <p style={{ minWidth: '60px' }}>State</p>
          <FormControl sx={{ minWidth: 120 }}>
            <Select
              labelId="priority-select-label"
              id="priority-select"
              value={newTodoState}
              onChange={(e) => handleStateChange(e)}
              label=""
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
              <MenuItem value="Undone">Undone</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}

export default TodosFilter;