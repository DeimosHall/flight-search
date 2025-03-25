import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi, afterEach } from 'vitest'
import '@testing-library/jest-dom/vitest';
import NewTodoModal from '../../views/NewTodoModal';

describe('NewTodoModal', () => {
  const mockHandleClose = vi.fn();
  const mockOnTodoEdited = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
    document.body.innerHTML = '';
  });

  it('renders correctly when open', () => {
    render(
      <NewTodoModal isOpen={true} handleClose={mockHandleClose} onTodoAdded={mockOnTodoEdited} />
    );

    expect(screen.getByText('Create a new To Do')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<NewTodoModal isOpen={false} handleClose={mockHandleClose} onTodoAdded={mockOnTodoEdited} />)
    screen.debug();
    expect(screen.queryByText('Create a new To Do')).not.toBeInTheDocument();
  });
});