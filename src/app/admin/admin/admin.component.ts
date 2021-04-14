import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { map, mergeMap } from 'rxjs/operators';
import { INews } from 'src/app/shared/interfaces/news.interface';
import { News } from 'src/app/shared/models/news.model';
import { AdminService } from 'src/app/shared/services/admin/admin.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  newsArr: Array<INews> = [];

  chosedNews: INews;

  title: string = '';
  puthToImage: string = '';
  description: string = '';
  text: string = '';
  shortText: string;
  category: string = 'Games';
  data: string;
  author: string = '';
  id: string | number;

  createVis: boolean = true;
  uploadVis: boolean = true;

  editStatus: boolean = false;

  newsID: string | number | undefined = null;

  validInp: boolean = true;

  order: number;

  constructor(
    private adminService: AdminService,
    private storage: AngularFireStorage) { }

  ngOnInit(): void {
    // this.getNews();
    this.getNewsFire();
  }

  // getNews(): void {
  //   this.adminService.getJSONNews().subscribe(
  //     data => {
  //       this.newsArr = data;
  //       this.newsArr.reverse();
  //     },
  //     err => console.log(err)
  //   );
  // }

  uploadFile(event): void {
    const file = event.target.files[0];

    const filePath = file.name;
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);

    task.then(image => {
      this.storage.ref(`${image.metadata.name}`)
        .getDownloadURL()
        .subscribe(url => {
          this.puthToImage = url
        })
      this.uploadVis = false;
    });

  }

  // addNews(): void {
  //   if (confirm('Are you sure?')) {
  //     this.shortText = this.text.slice(0, 20) + '...';
  //     let newData = new Date().toLocaleDateString();
  //     this.data = newData;
  //     let newNews = new News(this.title, this.puthToImage, this.description, this.text, this.shortText, this.data, this.category, this.author);
  //     if (!this.editStatus) {
  //       this.adminService.postJSONNews(newNews).subscribe(
  //         () => {
  //           this.getNews();
  //         },
  //         err => console.log(err)
  //       );
  //     }
  //     else {
  //       newNews.id = this.newsID;
  //       this.adminService.putJSONNews(newNews).subscribe(
  //         () => { this.getNews(); },
  //         err => {
  //           console.log(err);
  //         }
  //       )
  //       this.editStatus = false;
  //     }
  //     this.createVis = true;
  //     this.resetForm();
  //   }
  // }

  // deleteNews(numNews: INews): void {
  //   if (confirm('Are you sure?')) {
  //     this.adminService.deleteJSONNews(numNews.id).subscribe(
  //       () => {
  //         this.getNews();
  //       },
  //       err => console.log(err)
  //     );
  //   }

  // }

  private resetForm() {
    this.title = '';
    this.puthToImage = '';
    this.description = '';
    this.text = '';
    this.shortText = '';
    this.category = '';
    this.data = '';
    this.author = '';
  }

  selectChangeHandler(event: any): void {
    this.category = event.target.value;
    console.log(this.category);

  }

  checkInp(): void {
    if (this.title == '' || this.text == '' || this.description == '' || this.author == '' || this.puthToImage == '') {
      this.validInp = true;
    }
    else {
      this.validInp = false;
    }
  }

  create(): void {
    if (confirm('Are you sure?')) {
      this.createVis = false;
    }
  }

  close(): void {
    this.uploadVis = true;
  }

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
      console.log(this.newsArr);
    });
  }

  addNews(): void {
    if (confirm('Are you sure?')) {

      this.shortText = this.text.slice(0, 20) + '...';
      let newData = new Date().toLocaleDateString();
      this.data = newData;
      const NEWNEWS = new News(this.title, this.puthToImage, this.description, this.text, this.shortText, this.data, this.category, this.author, this.newsArr.length+1);

      if (!this.editStatus) {
        this.adminService.addFireCloudNews(NEWNEWS)
          .then(() => console.log('Add category success'))
          .catch(err => console.log(err));
      }

      else {
        const NEWNEWSU = new News(this.title, this.puthToImage, this.description, this.text, this.shortText, this.data, this.category, this.author, this.order);
        this.adminService.updateFireCloudNews(this.newsID.toString(), NEWNEWSU)
          .then(() => console.log('news updated'))
          .catch(err => console.log(err));
        this.editStatus = false;
      }
      this.createVis = true;
      this.resetForm();
    }
  }

  editNews(numNews: INews): void {
    if (confirm('Are you sure?')) {
      console.log(this.chosedNews);

      this.createVis = false;
      this.title = numNews.title;
      this.puthToImage = numNews.image;
      this.description = numNews.description;
      this.text = numNews.text;
      this.category = numNews.category;
      this.author = numNews.author;
      this.newsID = numNews.id;
      this.editStatus = true;
      this.order = numNews.order;
      // this.chosedNews = numNews;
    }
  }

  deleteNews(numNews: INews): void {
    if (confirm('Are you sure?')) {
      this.adminService.deleteFireCloudNews(numNews.id.toString());
    }
  }

}
