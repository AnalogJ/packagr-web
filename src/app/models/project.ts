import {Job} from './job';
import {ProjectSecret} from './project-secret';

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
  secrets: ProjectSecret;
  settings: {
    packageType: string;
    dockerImage: string;
    versionIncr: string;
  };
  status: any;
  private: boolean;

  jobs: Job[];
}
