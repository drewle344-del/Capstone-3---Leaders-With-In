# Capstone-3---Leaders-With-In

This application helps individuals who are promoted into leadership roles and prepare the skills and confidence needed to lead effectively. Our platform addresses this gap by providing practical tools, resources, and structured development pathways to help emerging leaders build essential leadership competencies.

## Daily Leadership Scenarios Feature

An interactive learning module inspired by Duolingo's design, where users practice leadership decision-making through short, engaging scenarios.

### Features

- **Scenario-Based Learning**: Present users with real leadership situations
- **Multiple Choice Responses**: Choose from 3-4 options per scenario
- **Duolingo-Style UI**: Clean, mobile-first design with green theme
- **Progress Tracking**: Save responses locally for future analysis
- **Fast Interactions**: 1-3 minute sessions

### Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: CSS with mobile-responsive design
- **Storage**: Local JSON data and localStorage for responses

### Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5174](http://localhost:5174) in your browser

### Building for Production

```bash
npm run build
```

### Project Structure

```
src/
├── components/
│   ├── ScenarioCard.tsx
│   ├── OptionButtonGroup.tsx
│   ├── SubmitButton.tsx
│   └── FeedbackScreen.tsx
├── data/
│   └── scenarios.ts
├── App.tsx
└── index.css
```

### Future Enhancements

- Feedback engine explaining response quality
- Progress tracking with XP and levels
- Daily challenges
- User accounts and history
- Backend API for data persistence
