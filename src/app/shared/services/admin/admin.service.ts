import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INews } from '../../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private dbPath: string;

  constructor(private http: HttpClient) { 
    this.dbPath = 'http://localhost:3000/news';
  }

  getJSONNews(): Observable<Array<INews>>{
    return this.http.get<Array<INews>>(this.dbPath);
  }

  postJSONNews(news: INews): Observable<INews> {
    return this.http.post<INews>(this.dbPath, news);
  }

  deleteJSONNews(id: number): Observable<INews> {
    return this.http.delete<INews>(`${this.dbPath}/${id}`);
  }

  putJSONNews(news: INews): Observable<INews> {
    return this.http.put<INews>(`${this.dbPath}/${news.id}`, news)
  }
}
