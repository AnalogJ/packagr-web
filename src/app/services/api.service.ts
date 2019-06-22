import { Injectable } from '@angular/core';
import {AppSettings} from '../app-settings';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

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
    return this.jwtHelper.isTokenExpired();
  }

  // serviceType(): string{
  //   return localStorage.getItem('service_type')
  //
  // }

  authConnect(serviceType): Observable<any> {
    return this.http.get(`${AppSettings.API_ENDPOINT}/connect/${serviceType}`)
      .pipe(catchError(this.handleError));
  }

  authCallback(serviceType, queryParams): Observable<any> {
    const params: URLSearchParams = new URLSearchParams();

    for (let [key, value] of queryParams) {
      params.set(key, value);
    }
    console.log(params);

    return this.http.get(`${AppSettings.API_ENDPOINT}/callback/${serviceType}`, {
      search: params
    })
      .pipe(catchError(this.handleError));
  }

  //
  // fetchDockerImage(dockerImage): Observable<any>{
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('query', dockerImage);
  //
  //   return this.http.get(`//crossorigin.me/https://cloud.docker.com/v2/search/repositories/`, {
  //     search: params
  //   })
  //       .map((res: Response) => {
  //         let body = res.json();
  //         return body.results || [];
  //       })
  //       .catch(this.handleError);
  // }
  //
  // // Authenticated functions
  //
  // getProjects(): Observable<any> {
  //   var url = `${AppSettings.API_ENDPOINT}/project`;
  //   var cacheKey = this.cacheKey('GET', url);
  //   return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url)
  //         .map(this.extractData)
  //         .catch(this.handleError))
  // }
  //
  // getProject(orgId:string, repoId:string): Observable<any> {
  //   var url = `${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${orgId}/${repoId}`;
  //   var cacheKey = this.cacheKey('GET', url);
  //   return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url)
  //         .map(this.extractData)
  //         .catch(this.handleError))
  // }
  //
  // createProject(orgId:string, repoId:string){
  //   return this.authHttp.post(`${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${orgId}/${repoId}`, {})
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }
  // editProject(orgId:string, repoId:string, payload: any): Observable<any> {
  //   return this.authHttp.put(`${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${orgId}/${repoId}`, payload)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }
  //
  // deleteProject(orgId:string, repoId:string): Observable<any> {
  //   return this.authHttp.delete(`${AppSettings.API_ENDPOINT}/project/${this.serviceType()}/${orgId}/${repoId}`)
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }
  //
  // publishProject(orgId:string, repoId:string, prNumber:number, settings?: any): Observable<any>{
  //   return this.authHttp.post(`${AppSettings.API_ENDPOINT}/publish/${this.serviceType()}/${orgId}/${repoId}/${prNumber}`, settings || {})
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }
  //
  // getPublishLogs(orgId:string, repoId: string, prNumber: number, nextToken?: string): Observable<any> {
  //   let params: URLSearchParams = new URLSearchParams();
  //   if(nextToken){
  //     params.set('NextToken', nextToken);
  //   }
  //   return this.authHttp.get(`${AppSettings.API_ENDPOINT}/logs/${this.serviceType()}/${orgId}/${repoId}/${prNumber}`,{ search: params })
  //       .map(this.extractData)
  //       .catch(this.handleError);
  // }
  //
  // fetchOrgs(page?:number): Observable<any>{
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('page', (page || 0).toString());
  //   var url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/orgs`;
  //
  //   var cacheKey = this.cacheKey('GET', url, params);
  //   return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url,{ search: params })
  //           .map(this.extractData)
  //           .catch(this.handleError))
  // }
  //
  // fetchOrgRepos(orgId:string, page?:number): Observable<any>{
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('page', (page || 0).toString());
  //   var url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/orgs/${orgId}/repos`;
  //
  //   var cacheKey = this.cacheKey('GET', url, params);
  //   return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url,{ search: params })
  //             .map(this.extractData)
  //             .catch(this.handleError))
  //
  // }
  //
  // fetchOrgRepoPullRequests(orgId:string, repoId:string, page?:number): Observable<any>{
  //   let params: URLSearchParams = new URLSearchParams();
  //   params.set('page', (page || 0).toString());
  //   var url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/orgs/${orgId}/repos/${repoId}/pullrequests`;
  //
  //   var cacheKey = this.cacheKey('GET', url, params);
  //   return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url,{ search: params })
  //         .map(this.extractData)
  //         .catch(this.handleError))
  // }
  //
  // fetchOrgRepoPullRequest(orgId:string, repoId:string, prNumber:number): Observable<any>{
  //   var url = `${AppSettings.API_ENDPOINT}/fetch/${this.serviceType()}/orgs/${orgId}/repos/${repoId}/pullrequests/${prNumber}`;
  //
  //   var cacheKey = this.cacheKey('GET', url);
  //   return this.cacheService.get(cacheKey) || this.cacheService.put(cacheKey, this.authHttp.get(url)
  //         .map(this.extractData)
  //         .catch(this.handleError))
  // }

}
