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
  secrets: {[prop: string]: {
      encValue: string;
      updatedAt: string;
    }
  };
  settings: {
    packageType: string;
    dockerImage: string;
    versionIncr: string;
  };
  status: any;
  private: boolean;
}
