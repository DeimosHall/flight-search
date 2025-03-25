import React from "react";
import { Todo } from "../types";
import { Button, Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { todos } from "../api/todos";
import { useTodosFilter } from "../context/TodosFilterContext";

interface Props {
  todosList: Todo[];
  onTodosListChange: () => void;
  onTodoEdit: (todo: Todo) => void;
}

const TodosTable: React.FC<Props> = ({ todosList, onTodosListChange, onTodoEdit }) => {
  const priorityText = "Priority < >";
  const dueDateText = "Due Date < >";
  const [allTodosSelected, setAllTodosSelected] = React.useState(false);
  const { setTodosFilterAttributes } = useTodosFilter();
  const [sortOrder, setSortOrder] = React.useState('asc');

  const handleTodoDelete = async (todoId: number) => {
    await todos.delete(todoId).finally(async () => {
      onTodosListChange();
    });
  }

  const handleTodoEdit = (todo: Todo) => {
    if (todo.done) {
      alert('Todo must be undone to edit');
      return;
    }
    onTodoEdit(todo);
  }

  const handleTodoStateChange = async (todo: Todo, checked: boolean) => {
    todo.done = checked;
    todo.doneDate = checked ? new Date().toISOString() : undefined;
    await todos.update(todo).finally(async () => {
      onTodosListChange();
    });
  }

  const handleAllTodosStateChange = async (checked: boolean) => {
    setAllTodosSelected(checked);
    for (const todo of todosList) {
      handleTodoStateChange(todo, checked);
    }
  }

  const handleSortBy = (sortBy: string) => () => { 
    setTodosFilterAttributes(prev => ({ ...prev, sortBy, sortOrder: sortOrder === 'asc' ? 'desc' : 'asc' }));
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              checked={allTodosSelected}
              onChange={(event) => { handleAllTodosStateChange(event.target.checked) }}
            />
          </TableCell>
          <TableCell>Name</TableCell>
          <TableCell
            onClick={handleSortBy('priority')}
            style={{ cursor: 'pointer' }}
          >
            {priorityText}
          </TableCell>
          <TableCell
            onClick={handleSortBy('dueDate')}
            style={{ cursor: 'pointer' }}
          >
            {dueDateText}
          </TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {todosList.map((todo, index) => (
          <TableRow key={index}>
            <TableCell padding="checkbox">
              <Checkbox
                checked={todo.done}
                onChange={(event) => { handleTodoStateChange(todo, event.target.checked) }}
              />
            </TableCell>
            <TableCell>{todo.text}</TableCell>
            <TableCell>{todo.priority}</TableCell>
            <TableCell>{todo.dueDate ? todos.getFormattedDate(todo.dueDate) : '-'}</TableCell>
            <TableCell>
              <Button variant="text" onClick={() => handleTodoEdit(todo)}>
                Edit
              </Button>
              <Button variant="text" onClick={() => handleTodoDelete(todo.id)}>
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TodosTable;
