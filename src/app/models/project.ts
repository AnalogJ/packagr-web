export class Project {
  serviceType: string;
  org: string;
  repo: string;
  scmOrgId: string;
  scmRepoId: string;
  scmUrl: string;

  installation: any;
  secrets: any;
  settings: any;
  status: any;
  private: boolean;
}
