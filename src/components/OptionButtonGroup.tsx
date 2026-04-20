import React from 'react';
import './OptionButtonGroup.css';

interface OptionButtonGroupProps {
  options: string[];
  selectedOption: number | null;
  onSelect: (index: number) => void;
}

const OptionButtonGroup: React.FC<OptionButtonGroupProps> = ({ options, selectedOption, onSelect }) => {
  return (
    <div className="option-group">
      {options.map((option, index) => (
        <button
          key={index}
          className={`option-button ${selectedOption === index ? 'selected' : ''}`}
          onClick={() => onSelect(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default OptionButtonGroup;
