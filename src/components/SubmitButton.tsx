import React from 'react';
import './SubmitButton.css';

interface SubmitButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled = false, text = 'Continue' }) => {
  return (
    <button
      className="submit-button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
