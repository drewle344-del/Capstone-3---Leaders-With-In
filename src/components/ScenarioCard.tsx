import React from 'react';
import './ScenarioCard.css';

interface ScenarioCardProps {
  title: string;
  scenario: string;
}

const ScenarioCard: React.FC<ScenarioCardProps> = ({ title, scenario }) => {
  return (
    <div className="scenario-card">
      <h1 className="scenario-title">{title}</h1>
      <p className="scenario-text">{scenario}</p>
    </div>
  );
};

export default ScenarioCard;
