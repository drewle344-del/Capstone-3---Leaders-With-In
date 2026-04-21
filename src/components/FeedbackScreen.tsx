import React from 'react';
import './FeedbackScreen.css';

interface FeedbackScreenProps {
  selectedOptionText: string;
  feedbackMessage: string;
  leadershipTip: string;
  bestPracticeExplanation: string;
  baseXP: number;
  bonusXP: number;
  onNext: () => void;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  selectedOptionText,
  feedbackMessage,
  leadershipTip,
  bestPracticeExplanation,
  baseXP,
  bonusXP,
  onNext
}) => {
  return (
    <div className="feedback-screen">
      <div className="feedback-container">
        <h1 className="feedback-header">Response Recorded! 🎯</h1>
        
        <div className="feedback-card xp-earned">
          <h3>⭐ Experience Earned</h3>
          <div className="xp-breakdown">
            <span className="xp-item">+{baseXP} Base XP</span>
            {bonusXP > 0 && (
              <>
                <span className="xp-separator">+</span>
                <span className="xp-item bonus">+{bonusXP} Bonus XP</span>
              </>
            )}
          </div>
          <div className="xp-total">Total: +{baseXP + bonusXP} XP</div>
        </div>
        
        <div className="feedback-card selected-answer">
          <h3>Your Choice</h3>
          <p className="selected-text">{selectedOptionText}</p>
        </div>
        
        <div className="feedback-card feedback-message">
          <h3>📊 Feedback</h3>
          <p>{feedbackMessage}</p>
        </div>
        
        <div className="feedback-card leadership-tip">
          <h3>💡 Leadership Insight</h3>
          <p>{leadershipTip}</p>
        </div>
        
        <div className="feedback-card best-practice">
          <h3>🎓 Why This Matters</h3>
          <p>{bestPracticeExplanation}</p>
        </div>
        
        <button className="continue-button" onClick={onNext}>
          Next Scenario
        </button>
      </div>
    </div>
  );
};

export default FeedbackScreen;
