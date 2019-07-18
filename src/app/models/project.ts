export class Project {
  serviceType: string;
  org: string;
  repo: string;
  scmOrgId: string;
  scmRepoId: string;
  scmUrl: string;

  installation: {
    id: string;
  };
  secrets: {[prop: string]: string};
  settings: {
    packageType: string;
    dockerImage: string;
    versionIncr: string;
  };
  status: any;
  private: boolean;
}
