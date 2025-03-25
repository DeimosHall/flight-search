// frontend/src/views/TodosFilter.test.tsx
import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TodosFilter from '../../views/TodosFilter';
import { TodoListContextProvider } from '../../context/TodosFilterContext';

describe('TodosFilter', () => {
  it('renders the filter form', () => {
    render(
      <TodoListContextProvider>
        <TodosFilter />
      </TodoListContextProvider>
    );

    expect(document.body.textContent).toContain('Name');
    expect(document.body.textContent).toContain('Priority');
    expect(document.body.textContent).toContain('State');
    expect(document.body.textContent).toContain('All');
  });
});