import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { GetIdService } from 'src/app/shared/services/get-id/get-id.service';

@Component({
  selector: 'app-technology-news',
  templateUrl: './technology-news.component.html',
  styleUrls: ['./technology-news.component.scss']
})
export class TechnologyNewsComponent implements OnInit {
  
  
  newsArr: Array<INews> = [];

  newsForPages: Array<INews> = [];

  idNews: string | number;

  checkForNews: number;
  
  twoCheckForNews: number;

  constructor(private adminService: AdminService, private newsId: GetIdService) { }

  ngOnInit(): void {
    // this.getNews();
    this.getNewsFire();
  }

  // getNews(): void {
  //   this.adminService.getJSONNews().subscribe(
  //     data => {
  //       this.newsArr = data;
  //       this.newsArr.reverse().forEach((e)=>{
  //         if(e.category == 'Technology' ){
  //           this.newsForPages.push(e);
  //         }
  //       })
  //     },
  //     err => console.log(err)
  //   );
  // }

  getNewsFire(): void {
    this.adminService.getFireCloudNews().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.newsArr = data;
      this.newsArr.sort((prev, next) => prev.order - next.order).reverse();
      this.newsForPages = this.newsArr.filter(item => item.category === 'Technology');
      this.checkForNews = this.newsForPages.length + 2;
      this.twoCheckForNews = this.newsForPages.length + 1;
    },
      err => console.log(err)
    );
  }

  checkId(index: number): void {
    this.idNews = this.newsForPages[index].id;
    this.newsId.setId(this.idNews);
  }

}
