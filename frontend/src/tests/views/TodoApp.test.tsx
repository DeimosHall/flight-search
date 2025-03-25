import { render, screen } from '@testing-library/react';
import { it, expect, describe } from 'vitest'
import '@testing-library/jest-dom/vitest';
import TodoApp from '../../views/TodoApp';

describe('TodoApp', () => {
  it('renders correctly', () => {
    render(<TodoApp />);
    expect(screen.getByText('+ New To Do')).toBeInTheDocument();
  });
});