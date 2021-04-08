import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer/footer.component';

import { AdminComponent } from './admin/admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { HomeComponent } from './pages/home/home/home.component';
import { NewsComponent } from './pages/news/news/news.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { GameNewsComponent } from './pages/game-news/game-news.component';
import { MovieNewsComponent } from './pages/movie-news/movie-news/movie-news.component';
import { MusicNewsComponent } from './pages/music-news/music-news/music-news.component';
import { SportNewsComponent } from './pages/sport-news/sport-news/sport-news.component';
import { TechnologyNewsComponent } from './pages/technology-news/technology-news/technology-news.component';

import { SearchComponent } from './pages/search/search/search.component';

import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './pages/user/user/user.component';

import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    AdminLoginComponent,
    HomeComponent,
    NewsComponent,
    GameNewsComponent,
    MovieNewsComponent,
    MusicNewsComponent,
    SportNewsComponent,
    TechnologyNewsComponent,
    SearchComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    QuillModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
