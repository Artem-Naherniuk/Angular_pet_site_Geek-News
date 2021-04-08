import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private db: AngularFirestore) { }

  signInAdmin(email: string, password: string): void {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(userResponse => {
        console.log(userResponse);
        const ADMIN = {
          email: userResponse.user.email,
          id: userResponse.user.uid,
          role: 'ADMIN'
        };
        localStorage.setItem('admin', JSON.stringify(ADMIN));
        this.router.navigateByUrl('/admin');
      })
      .catch(err => console.log(err));
  }

  // signUpAmin(email: string, password: string): void {
  //   this.auth.createUserWithEmailAndPassword(email.toLocaleLowerCase(), password)
  //     .then(result => {
  //       const ADMIN =  {
  //         email: result.user.email,
  //         id: result.user.uid,
  //         role: 'ADMIN'
  //       };

  //       this.db.collection('/users').add(ADMIN);
  //       console.log(result.user);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       console.log(err.message + ' <= err message');
  //       window.alert(err.message);
  //     });
  // };

  signUp(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email.toLocaleLowerCase(), password);
  };

  signIn(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email.toLocaleLowerCase(), password);
  }

  getUserCollection(): AngularFirestoreCollection<any> {
    return this.db.collection('/users');
  }

}
