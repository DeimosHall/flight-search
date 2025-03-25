import * as React from 'react';
import BaseModal from '../components/BaseModal';
import { ActionType } from '../constants';
import { Todo } from '../types';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onTodoEdited: () => void;
  todo?: Todo;
}

const EditTodoModal: React.FC<Props> = ({ isOpen, handleClose, onTodoEdited, todo }) => {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose} onTodoActionDone={onTodoEdited} actionType={ActionType.EDIT} todo={todo} />
  );
}

export default EditTodoModal;