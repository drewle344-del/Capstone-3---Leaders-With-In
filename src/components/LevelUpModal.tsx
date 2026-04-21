import React, { useEffect } from 'react';
import './LevelUpModal.css';

interface LevelUpModalProps {
  newLevel: number;
  onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ newLevel, onClose }) => {
  useEffect(() => {
    // Auto-close after 3 seconds
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const motivationalMessages = [
    "You're becoming a stronger leader!",
    "Keep growing your leadership skills!",
    "You're on your journey to greatness!",
    "Your dedication is paying off!",
    "You're making excellent progress!",
  ];

  const randomMessage = motivationalMessages[newLevel % motivationalMessages.length];

  return (
    <div className="level-up-overlay">
      <div className="level-up-modal">
        <div className="level-up-content">
          <div className="level-up-icon">🎉</div>
          <h1 className="level-up-title">LEVEL UP!</h1>
          <div className="level-up-number">
            <span className="level-badge-large">{newLevel}</span>
          </div>
          <p className="level-up-message">{randomMessage}</p>
          <button className="level-up-button" onClick={onClose}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelUpModal;
