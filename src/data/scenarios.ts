export interface Scenario {
  id: number;
  title: string;
  scenario: string;
  options: string[];
  best_practice_option_index: number;
}

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "Team Conflict",
    scenario: "Two team members are arguing about how to complete a project. The disagreement is slowing down progress and affecting the team.",
    options: [
      "Take control and assign tasks yourself",
      "Help both teammates talk through the issue",
      "Ignore it and hope it resolves naturally",
      "Escalate it to a manager immediately"
    ],
    best_practice_option_index: 1
  },
  {
    id: 2,
    title: "Motivating Employees",
    scenario: "A team member has been underperforming lately. You notice they're disengaged and missing deadlines.",
    options: [
      "Give them a warning about their performance",
      "Have a private conversation to understand their challenges",
      "Assign them more work to build their skills",
      "Replace them with someone more motivated"
    ],
    best_practice_option_index: 1
  },
  {
    id: 3,
    title: "Project Deadline",
    scenario: "Your team is behind schedule on an important project. The client is expecting delivery soon.",
    options: [
      "Work extra hours yourself to catch up",
      "Reassign tasks and provide clear priorities",
      "Extend the deadline without telling the client",
      "Blame the team for the delay"
    ],
    best_practice_option_index: 1
  }
];
