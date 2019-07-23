export class Job {
  id: number;

  projectId: string;
  taskId: string;

  prId: string;

  // Release Options
  bumpType: string;
  dockerImage: string;

  // Job Status
  status: string;
  startedAt: string;
  completedAt: string;

  // Logging Options
  logStreamId: string;
}
