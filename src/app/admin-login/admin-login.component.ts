import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { finalize, map, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  email: string;
  password: string;

  role: string = '';

  usersCollection: Array<any> = [];

  countForLog: number = 0;

  constructor( private auth: AuthService, private db: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  adminSignIn(): void{
    this.usersCollection.forEach(e => {
     if( e.email == this.email && e.password == this.password && e.role == 'ADMIN'){
      this.auth.signInAdmin(this.email, this.password);
     }
     else{
        this.router.navigateByUrl('/home');
     }
    })
    this.email = '';
    this.password = '';
  }

  getUser(): void {
    this.auth.getUserCollection()
      .snapshotChanges()
      .pipe(
        mergeMap(collection =>
          collection.map(
            c => ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe(data => {
        this.usersCollection.push(data);
      });
  }

}
