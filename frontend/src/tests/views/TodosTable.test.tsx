import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest';
import TodosTable from '../../views/TodosTable';

describe('TodosTable', () => {
  it('renders correctly', () => {
    render(<TodosTable todosList={[]} onTodosListChange={() => {}} onTodoEdit={() => {}} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Priority < >')).toBeInTheDocument();
    expect(screen.getByText('Due Date < >')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();
  });
});