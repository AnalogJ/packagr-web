import { Injectable } from '@angular/core';
import {AppSettings} from '../app-settings';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Organization} from '../models/organization';
import {Repository} from '../models/repository';
import {User} from '../models/user';
import {Project} from '../models/project';
import {PullRequest} from '../models/pull-request';
import {Job} from '../models/job';
import {Commit} from '../models/commit';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }


  // //Helper functions
  // private extractData(res: Response) {
  //   let body = res.json();
  //   return body.data || { };
  // }
  // private handleError(error: Response | any) {
  //   // In a real world app, we might use a remote logging infrastructure
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || '';
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return errMsg;
  // }
  // cacheKey(method, url, query?:URLSearchParams): string {
  //   return '[' + method + ']' + url + '?' + (query || {}).toString()
  // }

  private handleError(error: HttpErrorResponse) {
    console.error(error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  // Unauthenticated functions

  loggedIn() {
    // naiive solution: if token is expired, then we're not "logged in".
    return !this.jwtHelper.isTokenExpired();
  }

  serviceType(): string {
    return localStorage.getItem('serviceType'); // can only be 'gh' or 'bb'
  }

  authConnect(serviceType): Observable<any> {
    return this.http.get(`${AppSettings.API_ENDPOINT}/connect/${serviceType}`)
      .pipe(catchError(this.handleError));
  }

  appInstallationUrl(): string {
    if ( this.serviceType() === 'gh' ) {
      return `https://github.com/apps/${environment.ghAppId}/installations/new`;
    } else {
      throw new Error('unknown service type, cannot generate application installation url.');
    }
  }

  authCallback(serviceType, queryParams): Observable<any> {

    // const params: HttpParams = new HttpParams();
    //
    // for (let [key, value] of Object.entries(queryParams)) {
    //   console.log("key:", key, "value:", value)
    //   params.set(key, value as string);
    // }
    // console.log("API PARAMS", params);

    return this.http.get(`${AppSettings.API_ENDPOINT}/callback/${serviceType}`, {
      params: queryParams
    })
      .pipe(catchError(this.handleError));
  }


  fetchDockerImage(dockerImage: string): Observable<any> {
    return this.http.get(`https://cors-proxy.packagr.io/corsproxy/?apiurl=https://index.docker.io/v1/search?q=${dockerImage}`)
      .pipe(catchError(this.handleError));
  }
  //
  // // Authenticated functions
  //
  getProjects(org: string, params?): Observable<Project[]> {
    // var url = `${AppSettings.API_ENDPOINT}/project`;
    // var cacheKey = this.cacheKey('GET', url);
    // return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url)
    //       .map(this.extractData)
    //       .catch(this.handleError))//project/{serviceType}/{org}/
    const url = `${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${org}`;

    return this.http.get<Project[]>(url, {params})
      .pipe(catchError(this.handleError));
  }

  getProject(org: string, repo: string, queryParams?): Observable<Project> {
    const url = `${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${org}/${repo}`;
    // var cacheKey = this.cacheKey('GET', url);
    // return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url)
    //       .map(this.extractData)
    //       .catch(this.handleError))
    return this.http.get<Project>(url, { params: queryParams })
      .pipe(catchError(this.handleError));
  }

  createProject(org, repo, queryParams) {
    return this.http.post(`${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${org}/${repo}`, {},
       { params: queryParams })
      .pipe(catchError(this.handleError));

  }
  editProject(org: string, repo: string, queryParams, payload: any): Observable<any> {
    return this.http.put(`${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${org}/${repo}`, payload,
      { params: queryParams })
      .pipe(catchError(this.handleError));
  }

  deleteProject(org: string, repo: string, queryParams): Observable<any> {
    return this.http.delete(`${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${org}/${repo}`, {
      params: queryParams
    })
      .pipe(catchError(this.handleError));
  }

  startJob(org: string, repo: string, prNumber: string, settings: any, queryParams): Observable<Job> {
    return this.http.post<Job>(`${AppSettings.API_ENDPOINT}/job/${this.serviceType()}/${org}/${repo}/${prNumber}`, settings, {
      params: queryParams
    })
      .pipe(catchError(this.handleError));
  }

  getJobLogs(org: string, repo: string, prNumber: string, jobId: string, queryParams: any): Observable<any> {
    // const params: any = {};
    // if (nextToken) {
    //   params.NextToken = nextToken;
    // }
    return this.http.get(`${AppSettings.API_ENDPOINT}/job/${this.serviceType()}/${org}/${repo}/${prNumber}/${jobId}/logs`,
      { params: queryParams })
      .pipe(catchError(this.handleError));

  }

  fetchUser(): Observable<User> {
    const params = new HttpParams();
    const url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/user`;

    return this.http.get<User>(url)
      .pipe(catchError(this.handleError));

    // var cacheKey = this.cacheKey('GET', url, params);
    // return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url,{ search: params })
    //         .map(this.extractData)
    //         .catch(this.handleError))
  }

  fetchOrgs(page?: number): Observable<Organization[]> {
    const params = new HttpParams();
    params.set('page', (page || 0).toString());
    const url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/orgs`;

    return this.http.get<Organization[]>(url, { params })
      .pipe(catchError(this.handleError));

    // var cacheKey = this.cacheKey('GET', url, params);
    // return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url,{ search: params })
    //         .map(this.extractData)
    //         .catch(this.handleError))
  }
  //
  fetchOrgRepos(params, page?: number): Observable<Repository[]> {
    if (page) {
      params.page = (page || 0).toString();
    }

    const url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/repos`;

    return this.http.get<Repository[]>(url, {
      params
    })
      .pipe(catchError(this.handleError));

  }

  fetchOrgRepoPullRequests(params, page?: number): Observable<PullRequest[]> {
    if (page) {
      params.page = (page || 0).toString();
    }

    const url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/pullrequests`;

    return this.http.get<PullRequest[]>(url, {
      params
    })
      .pipe(catchError(this.handleError));

    // var cacheKey = this.cacheKey('GET', url, params);
    // return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url,{ search: params })
    //       .map(this.extractData)
    //       .catch(this.handleError))
  }

  fetchOrgRepoPullRequest(params): Observable<PullRequest> {
    const url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/pullrequest`;

    return this.http.get<PullRequest>(url, {
      params
    })
      .pipe(catchError(this.handleError));

  }

  fetchOrgRepoPullRequestCommits(params): Observable<Commit[]> {
    const url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/pullrequestcommits`;

    return this.http.get<Commit[]>(url, {
      params
    })
      .pipe(catchError(this.handleError));
  }

  fetchOrgRepoFileContent(params): Observable<string> {
    const url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/file`;

    return this.http.get<string>(url, {
      params
    })
      .pipe(catchError(this.handleError));
  }

}
