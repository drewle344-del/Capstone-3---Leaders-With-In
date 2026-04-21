import React, { useState, useEffect } from 'react';
import ScenarioCard from './components/ScenarioCard';
import OptionButtonGroup from './components/OptionButtonGroup';
import SubmitButton from './components/SubmitButton';
import FeedbackScreen from './components/FeedbackScreen';
import LevelBadge from './components/LevelBadge';
import ProgressBar from './components/ProgressBar';
import LevelUpModal from './components/LevelUpModal';
import { scenarios } from './data/scenarios';
import type { UserProgress } from './utils/progressService';
import {
  loadProgress,
  saveProgress,
  addScenarioCompletion,
  calculateXPEarned,
  getProgressDetails,
} from './utils/progressService';
import './App.css';

interface UserResponse {
  scenario_id: number;
  selected_option_index: number;
  timestamp: string;
}

const App: React.FC = () => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [progress, setProgress] = useState<UserProgress>(loadProgress());
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [xpEarned, setXpEarned] = useState({ baseXP: 0, bonusXP: 0 });

  useEffect(() => {
    const savedResponses = localStorage.getItem('leadershipResponses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  const currentScenario = scenarios[currentScenarioIndex];

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;

    const newResponse: UserResponse = {
      scenario_id: currentScenario.id,
      selected_option_index: selectedOption,
      timestamp: new Date().toISOString(),
    };

    const updatedResponses = [...responses, newResponse];
    setResponses(updatedResponses);
    localStorage.setItem('leadershipResponses', JSON.stringify(updatedResponses));

    // Calculate XP
    const wasBestAnswer = selectedOption === currentScenario.best_practice_option_index;
    const xp = calculateXPEarned(wasBestAnswer);
    setXpEarned(xp);

    // Update progress
    const result = addScenarioCompletion(progress, currentScenario.id, wasBestAnswer);
    const updatedProgress = result.updatedProgress;
    saveProgress(updatedProgress);
    setProgress(updatedProgress);

    // Check if leveled up
    if (result.leveledUp) {
      setNewLevel(result.newLevel);
      setShowLevelUp(true);
    }

    setShowFeedback(true);
  };

  const handleLevelUpClose = () => {
    setShowLevelUp(false);
  };

  const handleNext = () => {
    setShowFeedback(false);
    setSelectedOption(null);

    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setSessionComplete(true);
    }
  };

  if (sessionComplete) {
    return (
      <div className="app">
        <LevelBadge 
          level={progress.level} 
          totalXP={progress.total_xp}
          completedScenarios={progress.completed_scenarios.length}
        />
        <div className="end-screen">
          <h1>Great Job!</h1>
          <p>You've completed today's leadership scenarios.</p>
          <button className="restart-button" onClick={() => {
            setCurrentScenarioIndex(0);
            setSessionComplete(false);
            setSelectedOption(null);
            setShowFeedback(false);
          }}>
            Start Over
          </button>
        </div>
      </div>
    );
  }

  const progressDetails = getProgressDetails(progress.total_xp, progress.level);

  if (showFeedback && selectedOption !== null) {
    const feedback = currentScenario.feedback;
    const selectedOptionText = currentScenario.options[selectedOption];
    const feedbackMessage = feedback.option_feedback[selectedOption];
    const leadershipTip = feedback.leadership_tip;
    const bestPracticeExplanation = feedback.best_practice_explanation;

    return (
      <>
        {showLevelUp && <LevelUpModal newLevel={newLevel} onClose={handleLevelUpClose} />}
        <div className="app">
          <LevelBadge 
            level={progress.level} 
            totalXP={progress.total_xp}
            completedScenarios={progress.completed_scenarios.length}
          />
          <ProgressBar 
            currentXP={progressDetails.currentXP}
            requiredXP={progressDetails.requiredXP}
            percentage={progressDetails.percentage}
          />
          <FeedbackScreen
            selectedOptionText={selectedOptionText}
            feedbackMessage={feedbackMessage}
            leadershipTip={leadershipTip}
            bestPracticeExplanation={bestPracticeExplanation}
            baseXP={xpEarned.baseXP}
            bonusXP={xpEarned.bonusXP}
            onNext={handleNext}
          />
        </div>
      </>
    );
  }

  return (
    <div className="app">
      <LevelBadge 
        level={progress.level} 
        totalXP={progress.total_xp}
        completedScenarios={progress.completed_scenarios.length}
      />
      <ProgressBar 
        currentXP={progressDetails.currentXP}
        requiredXP={progressDetails.requiredXP}
        percentage={progressDetails.percentage}
      />
      <ScenarioCard
        title={currentScenario.title}
        scenario={currentScenario.scenario}
      />
      <OptionButtonGroup
        options={currentScenario.options}
        selectedOption={selectedOption}
        onSelect={handleOptionSelect}
      />
      <SubmitButton
        onClick={handleSubmit}
        disabled={selectedOption === null}
      />
    </div>
  );
};

export default App;
