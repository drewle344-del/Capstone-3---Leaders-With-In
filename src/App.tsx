import React, { useState, useEffect } from 'react';
import ScenarioCard from './components/ScenarioCard';
import OptionButtonGroup from './components/OptionButtonGroup';
import SubmitButton from './components/SubmitButton';
import FeedbackScreen from './components/FeedbackScreen';
import { scenarios } from './data/scenarios';
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

    setShowFeedback(true);
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

  if (showFeedback && selectedOption !== null) {
    const feedback = currentScenario.feedback;
    const selectedOptionText = currentScenario.options[selectedOption];
    const feedbackMessage = feedback.option_feedback[selectedOption];
    const leadershipTip = feedback.leadership_tip;
    const bestPracticeExplanation = feedback.best_practice_explanation;

    return (
      <FeedbackScreen
        selectedOptionText={selectedOptionText}
        feedbackMessage={feedbackMessage}
        leadershipTip={leadershipTip}
        bestPracticeExplanation={bestPracticeExplanation}
        onNext={handleNext}
      />
    );
  }

  return (
    <div className="app">
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
