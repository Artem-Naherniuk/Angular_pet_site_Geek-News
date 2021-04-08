import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetSearchService {

  constructor() { }

  private searchText;

  private subject = new Subject<any>();

  sendSearch(search: string) {
    this.subject.next({ text: search });
  }

  clearSearch() {
    this.subject.next();
  }

  getSearch(): Observable<any> {
    return this.subject.asObservable();
  }

  setSearchText(searchText) {
    this.searchText = searchText;
  }

  getSearchText() {
    let temp = this.searchText;
    this.clearSearchText();
    return temp;
  }

  clearSearchText() {
    this.searchText = undefined;
  }
}
