import { render, screen } from '@testing-library/react';
import { it, expect, describe, vi } from 'vitest'
import BaseModal from '../../components/BaseModal';
import { ActionType } from '../../constants';
import '@testing-library/jest-dom/vitest';

describe('BaseModal', () => {
  

  it('should render nothing when isOpen is false', () => {
    render(<BaseModal isOpen={false} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toBe('');
  });

  it('should render "Create a new To Do" when actionType is CREATE', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toContain('Create a new To Do');
  });

  it('should render "Edit To Do" when actionType is EDIT', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.EDIT} />);
    expect(document.body.textContent).toContain('Edit To Do');
  });

  it('should render a button with the text "CREATE" when actionType is CREATE', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toContain('Create');
  });

  it('should render a button with the text "UPDATE" when actionType is EDIT', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.EDIT} />);
    expect(document.body.textContent).toContain('Edit');
  });

  it('should render a button with the text "CANCEL"', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toContain('Cancel');
  });

  it('should call handleClose when the "CANCEL" button is clicked', () => {
    const handleClose = vi.fn();
    render(<BaseModal isOpen={true} handleClose={handleClose} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    // screen.debug();
    // const cancelButton = screen.getByText('Cancel');
    const cancelButton = screen.getAllByText('Cancel')[5];
    cancelButton.click();
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should render a text input for the todo text', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toContain('Text');
  });

  it('should render a "Name" label for the todo text input', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toContain('Name');
  });

  it('should render a "Priority" label for the todo text input', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toContain('Priority');
  });

  it('should render a "Enable Due Date" label for the todo text input', () => {
    render(<BaseModal isOpen={true} handleClose={() => { }} onTodoActionDone={() => { }} actionType={ActionType.CREATE} />);
    expect(document.body.textContent).toContain('Enable Due Date');
  });
})