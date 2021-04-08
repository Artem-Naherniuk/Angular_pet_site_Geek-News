import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home/home.component';

import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AuthGuard } from './shared/guards/auth/auth.guard';
import { NewsComponent } from './pages/news/news/news.component';

import { GameNewsComponent } from './pages/game-news/game-news.component';
import { MovieNewsComponent } from './pages/movie-news/movie-news/movie-news.component';
import { MusicNewsComponent } from './pages/music-news/music-news/music-news.component';
import { SportNewsComponent } from './pages/sport-news/sport-news/sport-news.component';
import { TechnologyNewsComponent } from './pages/technology-news/technology-news/technology-news.component';

import { SearchComponent } from './pages/search/search/search.component';

import { UserComponent } from './pages/user/user/user.component';
import { UserAuthGuard } from './shared/guards/userAuth/user-auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {path: 'home', component: HomeComponent},
  {path: 'games', component: GameNewsComponent},
  {path: 'movies', component: MovieNewsComponent},
  {path: 'music', component: MusicNewsComponent},
  {path: 'sport', component: SportNewsComponent},
  {path: 'technology', component: TechnologyNewsComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'admin-login', component: AdminLoginComponent},
  {path: 'news', component: NewsComponent},
  {path: 'search', component: SearchComponent},
  {path: 'userP', component: UserComponent, canActivate: [UserAuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
