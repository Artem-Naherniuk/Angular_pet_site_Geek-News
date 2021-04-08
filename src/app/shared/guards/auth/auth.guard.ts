import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean  {
      if( this.checkAdminLogin()){
        return true;
      }
      else{
        this.router.navigateByUrl('/admin-login');
      }
  }

  checkAdminLogin(): boolean {
    if(localStorage.getItem('admin')){
      const ADMIN = JSON.parse(localStorage.getItem('admin'));
      if(ADMIN && ADMIN.role === 'ADMIN' ){
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
