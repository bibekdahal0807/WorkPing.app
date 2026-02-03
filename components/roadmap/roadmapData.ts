export type RoadmapPhase = {
  id: number;
  title: string;
  description: string;
  features: string[];
  current?: boolean;
};

export const roadmapPhases: RoadmapPhase[] = [
  {
    id: 1,
    title: "Phase 1 — Core Workflow",
    description: "Establish the foundation for accurate, client-ready updates.",
    features: [
      "GitHub App integration (private repos)",
      "AI-generated client updates",
      "Manual notes for non-code work",
      "Review & copy workflow",
    ],
    current: true,
  },
  {
    id: 2,
    title: "Phase 2 — Consistency & Automation",
    description: "Reduce repetition and make updates easier to deliver regularly.",
    features: [
      "Scheduled weekly update drafts",
      "Update history & archive",
      "Basic update templates",
    ],
  },
  {
    id: 3,
    title: "Phase 3 — Communication",
    description: "Deliver updates directly to clients where they already are.",
    features: [
      "Email sending after review",
      "Slack integration",
      "Client-specific delivery settings",
    ],
  },
  {
    id: 4,
    title: "Phase 4 — Expansion",
    description: "Support more workflows and development setups.",
    features: [
      "GitLab & Bitbucket support",
      "Multiple repositories per client",
      "Granular repo and branch selection",
    ],
  },
  {
    id: 5,
    title: "Phase 5 — Teams & Scale",
    description: "Enable collaboration and growth for larger teams.",
    features: [
      "Team workspaces",
      "Roles & permissions",
      "Shared update history",
    ],
  },
];
