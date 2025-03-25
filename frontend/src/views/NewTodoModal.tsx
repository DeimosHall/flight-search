import * as React from 'react';
import BaseModal from '../components/BaseModal';
import { ActionType } from '../constants';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  onTodoAdded: () => void;
}

const NewTodoModal: React.FC<Props> = ({ isOpen, handleClose, onTodoAdded }) => {
  return (
    <BaseModal isOpen={isOpen} handleClose={handleClose} onTodoActionDone={onTodoAdded} actionType={ActionType.CREATE} />
  );
}

export default NewTodoModal;