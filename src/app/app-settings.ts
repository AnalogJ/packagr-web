import { environment } from '../environments/environment';
export class AppSettings {
    public static get API_ENDPOINT(): string { return 'https://api.packagr.io/' + environment.apiVersion; }
    //

    public static get DOCKER_IMAGES(): any {
        return {
            generic: {
                display: 'Generic',
                image: 'analogj/capsulecd',
                recommendedSecrets:[]
            },
            chef: {
                display: 'Chef',
                image: 'analogj/capsulecd:chef',
                recommendedSecrets: ['CAPSULE_CHEF_SUPERMARKET_USERNAME', 'CAPSULE_CHEF_SUPERMARKET_KEY', 'CAPSULE_CHEF_SUPERMARKET_TYPE']
            },
            golang: {
                display: 'Golang',
                image: 'analogj/capsulecd:golang',
                recommendedSecrets: []
            },
            node: {
                display: 'Node',
                image: 'analogj/capsulecd:node',
                recommendedSecrets: ['CAPSULE_NPM_AUTH_TOKEN']
            },
            python: {
                display: 'Python',
                image: 'analogj/capsulecd:python',
                recommendedSecrets: ['CAPSULE_PYPI_USERNAME', 'CAPSULE_PYPI_PASSWORD']
            },
            ruby: {
                display: 'Ruby',
                image: 'analogj/capsulecd:ruby',
                recommendedSecrets: ['CAPSULE_RUBYGEMS_API_KEY']
            }
        };
    }
}
