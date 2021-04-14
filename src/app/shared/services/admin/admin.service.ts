import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { INews } from '../../interfaces/news.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private dbPath: string;
  private newsRef: AngularFirestoreCollection<INews> = null;

  constructor(private http: HttpClient, private db: AngularFirestore) { 
    this.dbPath = 'http://localhost:3000/news';

    this.newsRef = this.db.collection('/news');
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

  //-------------------------firebase-----------------------

  getFireCloudNews(): AngularFirestoreCollection<INews> {
    return this.newsRef;
  }

  addFireCloudNews(news: INews): Promise<DocumentReference<INews>> {
    return this.newsRef.add({ ...news });
  }

  deleteFireCloudNews(id: string): Promise<void> {
    return this.newsRef.doc(id).delete();
  }

  updateFireCloudNews(id: string, news: INews): Promise<void> {
    return this.newsRef.doc(id).update({ ...news });
  }
}
