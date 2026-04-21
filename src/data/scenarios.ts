export interface Scenario {
  id: number;
  title: string;
  scenario: string;
  options: string[];
  best_practice_option_index: number;
  feedback: {
    option_feedback: string[];
    leadership_tip: string;
    best_practice_explanation: string;
  };
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
    best_practice_option_index: 1,
    feedback: {
      option_feedback: [
        "Strong leadership requires collaboration in conflict situations.",
        "Excellent choice — promotes communication and resolution.",
        "Avoiding conflict can harm team performance and trust.",
        "Escalation should be used only when necessary."
      ],
      leadership_tip: "Great leaders resolve conflict early through communication.",
      best_practice_explanation: "Facilitating a conversation helps both parties understand each other and reduces tension while keeping control within the team."
    }
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
    best_practice_option_index: 1,
    feedback: {
      option_feedback: [
        "Warnings can create fear and reduce motivation.",
        "Perfect approach — understanding comes before action.",
        "Adding work may overwhelm and demotivate further.",
        "Replacement should be a last resort after other efforts."
      ],
      leadership_tip: "Effective leaders listen first to understand root causes.",
      best_practice_explanation: "A private conversation builds trust and reveals underlying issues like personal challenges or unclear expectations."
    }
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
    best_practice_option_index: 1,
    feedback: {
      option_feedback: [
        "Burnout reduces long-term productivity and morale.",
        "Smart leadership — delegate and clarify expectations.",
        "Hidden delays erode client trust and relationships.",
        "Blaming damages team confidence and unity."
      ],
      leadership_tip: "Strong leaders empower their team rather than doing everything themselves.",
      best_practice_explanation: "Reassigning tasks with clear priorities distributes workload effectively and maintains accountability."
    }
  }
];
