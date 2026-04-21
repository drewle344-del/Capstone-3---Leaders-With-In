import React from 'react';
import './LevelBadge.css';

interface LevelBadgeProps {
  level: number;
  totalXP: number;
  completedScenarios: number;
}

const LevelBadge: React.FC<LevelBadgeProps> = ({ level, totalXP, completedScenarios }) => {
  return (
    <div className="level-badge-container">
      <div className="level-badge">
        <div className="level-circle">
          <span className="level-number">{level}</span>
        </div>
        <div className="level-info">
          <div className="level-title">Level {level} Leader</div>
          <div className="level-stats">
            <span className="stat">{totalXP} XP</span>
            <span className="stat-separator">•</span>
            <span className="stat">{completedScenarios} Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelBadge;
