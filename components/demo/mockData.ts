export type GitHubActivity = {
  id: string;
  type: "commit" | "pull_request" | "bugfix";
  title: string;
  description?: string;
};

export const mockActivity: GitHubActivity[] = [
  {
    id: "1",
    type: "pull_request",
    title: "Add client progress summary generator",
    description: "Initial implementation for generating client-friendly updates"
  },
  {
    id: "2",
    type: "commit",
    title: "Refactor update formatting logic",
    description: "Improved readability and structure of generated summaries"
  },
  {
    id: "3",
    type: "bugfix",
    title: "Fix incorrect date range in weekly summaries",
    description: "Resolved edge case when selecting custom date ranges"
  },
  {
    id: "4",
    type: "commit",
    title: "Improve dashboard UI spacing",
    description: "Minor UI polish for better clarity"
  }
];
