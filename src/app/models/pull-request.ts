export class PullRequest {
  serviceType: string;
  id: string;
  title: string;
  description: string;
  state: string;

  user: string;
  userUrl: string;

  labels: string[];
  link: string;
  baseBranch: string;
  updatedAt: string;
}
