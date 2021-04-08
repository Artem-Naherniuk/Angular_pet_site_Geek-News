import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { GetSearchService } from 'src/app/shared/services/get-search/get-search.service';

import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visibleInputPhone: boolean = true;
  visibleMenu: boolean = true;

  searchPc: string = '';
  inpPhone: string = '';

  visibleLog: boolean = true;

  visibleName: boolean = true;

  existAcc: boolean = true;

  incPass: boolean = true;

  userPage: boolean = false;

  signForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  gMenu: string = 'url(../../../../assets/images/bars-g.svg)';

  wMenu: string = 'url(../../../../assets/images/bars.svg)';

  gSearchPhone: string = 'url(../../../../assets/images/search-alt-g.svg)';
  
  wSearchPhone:string = 'url(../../../../assets/images/search-alt.svg)';

  constructor(
    private getSearch: GetSearchService,
    private router: Router,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.checkUser();
  }

  submit(): void {
  }

  visibleInputP(): void {
    if (this.visibleInputPhone == true) {
      this.visibleInputPhone = false;
    }
    else if (this.visibleInputPhone == false) {
      this.visibleInputPhone = true;
    }
  }

  search(): void {
    this.visibleInputPhone = true;
    this.getSearch.setSearchText(this.inpPhone);
    this.getSearch.sendSearch(this.inpPhone);
    this.router.navigateByUrl('/search');
    this.inpPhone = '';
  }

  keyToSearch(button: any): void {
    if (button.key === 'Enter') {
      this.router.navigateByUrl('/search');
      this.getSearch.setSearchText(this.searchPc);
      this.getSearch.sendSearch(this.searchPc);
      this.searchPc = '';
    }
  }

  menu(): void {
    if (this.visibleMenu == true) {
      this.visibleMenu = false;
    }
    else if (this.visibleMenu == false) {
      this.visibleMenu = true;
    }
  }

  closePhonePage(): void {
    this.visibleMenu = true;
  }

  doVisibleLogin(): void {
    this.visibleLog = false;
  }

  closeVisibleLog(): void {
    this.visibleLog = true;
    this.existAcc = true;
    this.incPass = true;
    this.resetForms();
  }

  doSignUp(): void {
    if (this.visibleName == true) {
      this.visibleName = false;
    }
    else if (this.visibleName == false) {
      this.visibleName = true;
    }
    this.existAcc = true;
    this.incPass = true;
    this.resetForms();
  }

  addUserOrLog(): void {
    if (this.visibleName == true) {
      this.auth.signUp(this.signForm.value.email, this.signForm.value.password)
        .then(result => {
          console.log(result.user);
          this.existAcc = true;
          this.visibleLog = true;
          this.existAcc = true;
          this.resetForms();
        })
        .catch(err => {
          if (err.message = 'auth/email-already-in-use') {
            this.existAcc = false;
          }
        });
    }

    if (this.visibleName == false) {
      this.auth.signIn(this.signForm.value.email, this.signForm.value.password)
        .then(userResponse => {
          const USER = {
            email: userResponse.user.email,
            id: userResponse.user.uid,
            role: 'USER'
          };
          localStorage.setItem('user', JSON.stringify(USER));
          location.reload();
          this.incPass = true;
          this.visibleLog = true;
          this.incPass = true;
          this.resetForms();
        })
        .catch(err => {
          if(err.message = 'The password is invalid or the user does not have a password.'){
          this.incPass = false;
          }
        });

        console.log(this.visibleName);
        
    }

  }

  checkUser(): void {
    if (localStorage.getItem('user')) {
      this.userPage = true;
    }
  }

  resetForms(): void {
    this.signForm.reset();
  }


}

