import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
      if( this.checkUserLogin()){
        return true;
      }
      else{
        this.router.navigateByUrl('/home');
      }
  }

  checkUserLogin(): boolean {
    if(localStorage.getItem('user')){
      const USER = JSON.parse(localStorage.getItem('user'));
      if(USER && USER.role === 'USER' ){
        return true;
      }
      else{
        return false;
      }
    }
    else{
      return false;
    }
  }
  
}
