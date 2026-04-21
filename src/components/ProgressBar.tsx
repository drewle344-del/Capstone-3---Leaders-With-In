import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
  currentXP: number;
  requiredXP: number;
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentXP, requiredXP, percentage }) => {
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-wrapper">
        <div className="progress-bar-background">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      <div className="progress-bar-text">
        <span className="progress-xp">{currentXP} / {requiredXP} XP</span>
      </div>
    </div>
  );
};

export default ProgressBar;
