import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest';
import { Todo } from '../../types';
import EditTodoModal from '../../views/EditTodoModal';

describe('EditTodoModal', () => {
  const mockHandleClose = vi.fn();
  const mockOnTodoEdited = vi.fn();
  const todo: Todo = { id: 1, text: 'Test Todo', priority: 'Low', creationDate: new Date().toISOString() };

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders correctly when open', () => {
    render(
      <EditTodoModal isOpen={true} handleClose={mockHandleClose} onTodoEdited={mockOnTodoEdited} todo={todo} />
    );

    expect(screen.getByText('Edit To Do')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<EditTodoModal isOpen={false} handleClose={mockHandleClose} onTodoEdited={mockOnTodoEdited} todo={todo} />)
    expect(screen.queryByText('Edit To Do')).not.toBeInTheDocument();
  });
});