import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, FormControl, MenuItem, Select, Switch, TextField } from '@mui/material';
import { todos } from '../api/todos';
import { Todo } from '../types';
import { ActionType } from '../constants';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
};

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onTodoActionDone: () => void;
  actionType: ActionType;
  todo?: Todo;
}

const BaseModal: React.FC<Props> = ({ isOpen, handleClose, onTodoActionDone, actionType, todo }) => {
  const titleText = actionType === ActionType.CREATE ? 'Create a new To Do' : 'Edit To Do';
  const actionButtonText = actionType === ActionType.CREATE ? 'Create' : 'Edit';
  const [isDueDateEnabled, setIsDueDateEnabled] = React.useState(false);
  const [todoText, settodoText] = React.useState('');
  const [todoPriority, setTodoPriority] = React.useState('Low');
  const [todoDueDate, setTodoDueDate] = React.useState('');

  useEffect(() => {
    if (todo && actionType === ActionType.EDIT) {
      settodoText(todo.text);
      setTodoPriority(todo.priority);
      setTodoDueDate(todo.dueDate || '');
      setIsDueDateEnabled(!!todo.dueDate);
    }
  }, [todo, actionType, isOpen]);

  const handleCloseModal = () => {
    setIsDueDateEnabled(false);
    handleClose();
  }

  const verifyDueDateState = () => {
    if (isDueDateEnabled && todoDueDate === '') {
      alert('Due date cannot be empty');
      return false;
    }
    return true;
  }

  const handleCreate = () => {
    if (todoText.trim() !== '') {
      if (!verifyDueDateState()) {
        return;
      }
      const newTodo: Todo = {
        id: 0,
        text: todoText,
        dueDate: isDueDateEnabled ? todoDueDate : undefined,
        done: false,
        doneDate: undefined,
        priority: todoPriority,
        creationDate: new Date().toISOString(),
      };

      todos.create(newTodo)
        .then(onTodoActionDone)
        .catch((error) => {
          console.error('Failed to create todo with error:', error);
        })
        .finally(() => {
          // Resets values and closes modal after the request is done
          settodoText('');
          setTodoPriority('Low');
          setTodoDueDate('');
          handleCloseModal();
          // onTodoActionDone();
        });
    } else {
      alert('Task name cannot be empty');
    }
  }

  const handleEdit = () => {
    if (todoText.trim() !== '') {
      if (!verifyDueDateState()) {
        return;
      }
      const editedTodo: Todo = {
        ...todo,
        id: todo?.id ?? 0,
        text: todoText,
        dueDate: isDueDateEnabled ? todoDueDate : undefined,
        priority: todoPriority,
        creationDate: todo?.creationDate ?? new Date().toISOString(),
      };
      todos.update(editedTodo).finally(() => {
        // Resets values and closes modal after the request is done
        settodoText('');
        setTodoPriority('Low');
        setTodoDueDate('');
        handleCloseModal();
        onTodoActionDone();
      });
    } else {
      alert('Task name cannot be empty');
    }
  }

  const handleAction = () => {
    if (actionType === ActionType.CREATE) {
      handleCreate();
    } else {
      handleEdit();
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsDueDateEnabled(event.target.checked);
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {titleText}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Name</p>
            <TextField
              label="Text"
              value={todoText}
              onChange={(e) => settodoText(e.target.value)}
              fullWidth
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Priority</p>
            <FormControl sx={{ width: '100%' }}>
              <Select
                labelId="priority-select-label"
                id="priority-select"
                value={todoPriority}
                onChange={(e) => setTodoPriority(e.target.value as string)}
                label=""
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="High">High</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
            <p style={{ minWidth: '60px' }}>Enable Due Date</p>
            <Switch
              checked={isDueDateEnabled}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
          {isDueDateEnabled && (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <p style={{ minWidth: '60px' }}>Due Date</p>
              <TextField
                type="date"
                value={todoDueDate}
                onChange={(e) => setTodoDueDate(e.target.value)}
                required
              />
            </Box>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button variant="contained" onClick={handleAction}>{actionButtonText}</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default BaseModal;