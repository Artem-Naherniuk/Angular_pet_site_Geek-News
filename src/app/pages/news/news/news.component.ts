import { Component, OnInit } from '@angular/core';
import { NgAnimateScrollService } from 'ng-animate-scroll';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { GetIdService } from 'src/app/shared/services/get-id/get-id.service';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  newsArr: Array<INews> = [];

  recNews: Array<INews> = [];
 
  titleNews: string;
  descrNews: string;
  datatNews: string;
  catNews: string;
  authorNews: string;
  textNews: string;
  imageNews: string='';

  constructor(
    private newsId: GetIdService, 
    private adminService: AdminService,
    private animateScrollService: NgAnimateScrollService) { }

  idNews = this.newsId.getId();

  loadPage: number;

  ngOnInit(): void {
    this.getNewsId();
  }

  getNewsId(): void {
    this.adminService.getJSONNews().subscribe(
      data => {
        this.newsArr = data;
        this.newsArr.forEach((e) => {
          if (e.id === this.idNews) {
            this.titleNews = e.title;
            this.descrNews = e.description;
            this.datatNews = e.data;
            this.catNews = e.category;
            this.authorNews = e.author;
            this.textNews = e.text;
            this.imageNews = e.image;
          }
        });
        this.recNews = this.newsArr.slice(this.newsArr.length-4,this.newsArr.length);
      },
      err => console.log(err)
    );
  }

  checkId(index: number): void {
    this.loadPage = this.recNews[index].id;
    this.newsArr.forEach((e) => {
      if (e.id === this.loadPage) {
        this.titleNews = e.title;
        this.descrNews = e.description;
        this.datatNews = e.data;
        this.catNews = e.category;
        this.authorNews = e.author;
        this.textNews = e.text;
        this.imageNews = e.image;
      }
    });
    this.recNews = this.newsArr.slice(this.newsArr.length-4,this.newsArr.length);
    this.animateScrollService.scrollToElement('title', );
  }


}
