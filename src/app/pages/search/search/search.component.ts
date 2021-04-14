import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { AdminService } from 'src/app/shared/services/admin/admin.service';
import { GetIdService } from 'src/app/shared/services/get-id/get-id.service';
import { GetSearchService } from 'src/app/shared/services/get-search/get-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  newsArr: Array<INews> = [];

  searchingNews: Array<INews> = [];

  search:string = '';

  idNews: string | number;
  
  subscription: Subscription;

  existOrnotExist: boolean = true;

  checkForNews: number;

  twoCheckForNews: number;


  constructor(
    private adminService: AdminService, 
    private newsId: GetIdService,
    private searchText: GetSearchService) { 
      this.subscription = this.searchText.getSearch().subscribe(search => { 
        this.existOrnotExist = true;
        this.searchingNews = this.newsArr.filter(item => item.title.toLocaleLowerCase().includes(search.text.toLocaleLowerCase()) || 
        item.description.toLocaleLowerCase().includes(search.text.toLocaleLowerCase()));
        if(this.searchingNews.length < 1){
        this.existOrnotExist = false;
        }
        this.checkForNews = this.searchingNews.length + 2;
        this.twoCheckForNews = this.searchingNews.length + 1;
       });
     
       
    }

  ngOnInit(): void {
    // this.getNews();
    this.  getNewsFire();
  }

  // getNews(): void {
  //   this.adminService.getJSONNews().subscribe(
  //     data => {
  //       this.newsArr = data; 
  //       this.search = this.searchText.getSearchText();         
  //       if(this.search !== undefined){
  //         this.searchingNews = this.newsArr.filter(item => item.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()) ||
  //         item.description.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
  //       }
  //       if(this.searchingNews.length < 1){
  //       this.existOrnotExist = false;//
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
      this.newsArr.sort((prev, next) => prev.order - next.order).reverse();
      this.search = this.searchText.getSearchText();         
        if(this.search !== undefined){
          this.searchingNews = this.newsArr.filter(item => item.title.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()) ||
          item.description.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()));
        }
        if(this.searchingNews.length < 1){
        this.existOrnotExist = false;
        }; 
        this.checkForNews = this.searchingNews.length + 2;
        this.twoCheckForNews = this.searchingNews.length + 1;
    });
  }

  checkId(index: number): void {
    this.idNews = this.searchingNews[index].id;
    this.newsId.setId(this.idNews);
  }

}
