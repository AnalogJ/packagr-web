// import { Observable } from 'rxjs/Observable';
// import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Injectable } from '@angular/core';

// Designed around http://stackoverflow.com/a/36413003/1157633

@Injectable()
export class CacheService {
  // private cache: { [s: string]: ReplaySubject<any>; } = {};
  //
  // constructor() { }
  //
  // get(cacheKey: string): ReplaySubject<any> {
  //   return this.cache[cacheKey];
  // }
  //
  // put(cacheKey: string, observable: Observable<any>): ReplaySubject<any> {
  //   let currentSubject = this.get(cacheKey);
  //   if(!currentSubject) {
  //     this.cache[cacheKey] = new ReplaySubject<any>(1);
  //     currentSubject = this.cache[cacheKey]; // if the current cacheKey doesn't exist in the cache, lets ensure that we create it.
  //   }
  //   observable.subscribe(
  //       data => currentSubject.next(data),
  //       error => currentSubject.error(error),
  //       () => currentSubject.complete()
  //   );
  //   return currentSubject;
  // }
  // delete(cacheKey: string) {
  //   delete this.cache[cacheKey];
  // }
}
