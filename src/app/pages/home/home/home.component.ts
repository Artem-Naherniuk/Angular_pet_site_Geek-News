import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { GetIdService } from 'src/app/shared/services/get-id/get-id.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  newsArr: Array<INews> = [];

  lastNews: INews;
  lastNewsImage: string = '';
  lastNewsTitle: string;
  lastNewsDesc: string;
  lastNewsData: string;
  lastNewsCat: string;
  lastNewsId: string | number;

  twolastNews: INews;
  twolastNewsImage: string = '';
  twolastNewsTitle: string;
  twolastNewsDesc: string;
  twolastNewsData: string;
  twolastNewsCat: string;
  twolastNewsId: string | number;


  threelastNews: INews;
  threelastNewsImage: string = '';
  threelastNewsTitle: string;
  threelastNewsDesc: string;
  threelastNewsData: string;
  threelastNewsCat: string;
  threelastNewsId: string | number;



  forSmalNews: Array<INews> = [];

  loadPage: string | number;

  constructor(private adminService: AdminService, private newsId: GetIdService) { }

  ngOnInit(): void {
    // this.getNews();
    this.getNewsFire();
  }

  // getNews(): void {
  //   this.adminService.getJSONNews().subscribe(
  //     data => {
  //       this.newsArr = data;
  //       this.doLastNews();
  //       this.doTwoLastNews();
  //       this.doThreeLastNews();
  //       this.forSmalNews = this.newsArr.slice(0,this.newsArr.length-3).reverse();
  //       if(this.forSmalNews.length > 9){
  //         let q = this.forSmalNews.length-9;
  //         this.forSmalNews = this.forSmalNews.slice(0,this.forSmalNews.length-q);
  //       }
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
      this.newsArr.sort((prev, next) => prev.order - next.order);
      this.doLastNews();
      this.doTwoLastNews();
      this.doThreeLastNews();
      this.forSmalNews = this.newsArr.slice(0, this.newsArr.length - 3).reverse();
      if (this.forSmalNews.length > 9) {
        let q = this.forSmalNews.length - 9;
        this.forSmalNews = this.forSmalNews.slice(0, this.forSmalNews.length - q);
      }
    });
  }

  doLastNews(): void {
    this.lastNews = this.newsArr[this.newsArr.length - 1];
    this.lastNewsImage = this.lastNews.image;
    this.lastNewsTitle = this.lastNews.title;
    this.lastNewsDesc = this.lastNews.description;
    this.lastNewsData = this.lastNews.data;
    this.lastNewsCat = this.lastNews.category;
    this.lastNewsId = this.lastNews.id;
  }

  doTwoLastNews(): void {
    this.twolastNews = this.newsArr[this.newsArr.length - 2];
    this.twolastNewsImage = this.twolastNews.image;
    this.twolastNewsTitle = this.twolastNews.title;
    this.twolastNewsDesc = this.twolastNews.description;
    this.twolastNewsData = this.twolastNews.data;
    this.twolastNewsCat = this.twolastNews.category;
    this.twolastNewsId = this.twolastNews.id
  }

  doThreeLastNews(): void {
    this.threelastNews = this.newsArr[this.newsArr.length - 3];
    this.threelastNewsImage = this.threelastNews.image;
    this.threelastNewsTitle = this.threelastNews.title;
    this.threelastNewsDesc = this.threelastNews.description;
    this.threelastNewsData = this.threelastNews.data;
    this.threelastNewsCat = this.threelastNews.category;
    this.threelastNewsId = this.threelastNews.id
  }

  checkId(index: number): void {
    this.loadPage = this.forSmalNews[index].id;
    this.newsId.setId(this.loadPage);
  }

  checkIdOne(): void {
    this.newsId.setId(this.lastNewsId);
  }

  checkIdTwo(): void {
    this.newsId.setId(this.twolastNewsId);
  }

  checkIdThree(): void {
    this.newsId.setId(this.threelastNewsId);
  }

}
