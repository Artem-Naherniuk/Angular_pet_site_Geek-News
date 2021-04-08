import { Component, OnInit } from '@angular/core';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { GetIdService } from 'src/app/shared/services/get-id/get-id.service';

@Component({
  selector: 'app-music-news',
  templateUrl: './music-news.component.html',
  styleUrls: ['./music-news.component.scss']
})
export class MusicNewsComponent implements OnInit {

  
  newsArr: Array<INews> = [];

  newsForPages: Array<INews> = [];

  idNews: number;

  constructor(private adminService: AdminService, private newsId: GetIdService) { }

  ngOnInit(): void {
    this.getNews()
  }

  getNews(): void {
    this.adminService.getJSONNews().subscribe(
      data => {
        this.newsArr = data;
        this.newsArr.reverse().forEach((e)=>{
          if(e.category == 'Music'){
            this.newsForPages.push(e);
          }
        })
      },
      err => console.log(err)
    );
  }

  checkId(index: number): void {
    this.idNews = this.newsForPages[index].id;
    this.newsId.setId(this.idNews);
  }

}