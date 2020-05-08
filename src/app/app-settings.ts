import { environment } from '../environments/environment';
export class AppSettings {
  public static get API_ENDPOINT(): string {
    return environment.apiEndpoint;
  }

  //

  public static get DOCKER_IMAGES(): any {
    return {
      generic: {
        display: 'Generic',
        image: 'analogj/capsulecd',
        recommendedSecrets: []
      },
      chef: {
        display: 'Chef',
        image: 'analogj/capsulecd:latest-chef',
        recommendedSecrets: ['CAPSULE_CHEF_SUPERMARKET_USERNAME', 'CAPSULE_CHEF_SUPERMARKET_KEY', 'CAPSULE_CHEF_SUPERMARKET_TYPE']
      },
      golang: {
        display: 'Golang',
        image: 'analogj/capsulecd:latest-golang',
        recommendedSecrets: []
      },
      node: {
        display: 'Node',
        image: 'analogj/capsulecd:latest-node',
        recommendedSecrets: ['CAPSULE_NPM_AUTH_TOKEN']
      },
      python: {
        display: 'Python',
        image: 'analogj/capsulecd:latest-python',
        recommendedSecrets: ['CAPSULE_PYPI_USERNAME', 'CAPSULE_PYPI_PASSWORD']
      },
      ruby: {
        display: 'Ruby',
        image: 'analogj/capsulecd:latest-ruby',
        recommendedSecrets: ['CAPSULE_RUBYGEMS_API_KEY']
      }
    };
  }

  public static get ALL_CAPSULECD_TAGS(): string[] {
    return [
      '3.0.10-chef1.x',
      '3.0.10-chef2.x',
      '3.0.10-chef3.x',
      '3.0.10-chef',

      '3.0.11-chef1.x',
      '3.0.11-chef2.x',
      '3.0.11-chef3.x',
      '3.0.11-chef',

      'latest-chef1.x',
      'latest-chef2.x',
      'latest-chef3.x',
      'latest-chef',

      '3.0.10-golang1.10',
      '3.0.10-golang1.11',
      '3.0.10-golang1.12',
      '3.0.10-golang1.13',
      '3.0.10-golang',

      '3.0.11-golang1.10',
      '3.0.11-golang1.11',
      '3.0.11-golang1.12',
      '3.0.11-golang1.13',
      '3.0.11-golang',

      'latest-golang1.10',
      'latest-golang1.11',
      'latest-golang1.12',
      'latest-golang1.13',
      'latest-golang',

      '3.0.10-node8',
      '3.0.10-node10',
      '3.0.10-node12',
      '3.0.10-node',

      '3.0.11-node8',
      '3.0.11-node10',
      '3.0.11-node12',
      '3.0.11-node',

      'latest-node8',
      'latest-node10',
      'latest-node12',
      'latest-node',

      '3.0.10-python2.7',
      '3.0.10-python3.5',
      '3.0.10-python3.6',
      '3.0.10-python3.7',
      '3.0.10-python',

      '3.0.11-python2.7',
      '3.0.11-python3.5',
      '3.0.11-python3.6',
      '3.0.11-python3.7',
      '3.0.11-python',

      'latest-python2.7',
      'latest-python3.5',
      'latest-python3.6',
      'latest-python3.7',
      'latest-python',

      '3.0.10-ruby2.4',
      '3.0.10-ruby2.5',
      '3.0.10-ruby2.6',
      '3.0.10-ruby',

      '3.0.11-ruby2.4',
      '3.0.11-ruby2.5',
      '3.0.11-ruby2.6',
      '3.0.11-ruby',

      'latest-ruby2.4',
      'latest-ruby2.5',
      'latest-ruby2.6',
      'latest-ruby'
    ];
  }
}


