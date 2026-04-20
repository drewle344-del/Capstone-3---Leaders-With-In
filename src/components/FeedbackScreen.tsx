import React from 'react';
import './FeedbackScreen.css';

interface FeedbackScreenProps {
  message: string;
  onNext: () => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({ message, onNext }) => {
  return (
    <div className="feedback-screen">
      <div className="feedback-card">
        <h2 className="feedback-message">{message}</h2>
        <button className="next-button" onClick={onNext}>
          Next Scenario
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
