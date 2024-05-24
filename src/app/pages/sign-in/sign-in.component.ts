import { Component } from '@angular/core';
import { User } from '../../core/models/user';
import { NgForm } from '@angular/forms';
import { UserService } from '../../core/service/user.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { environment } from '../../../environments/environment.development';
import { LocalStorageKey } from '../../core/constant/LocalStorageKey';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styles: ``
})
export class SignInComponent {
  user: User= new User()
  constructor(private userService: UserService,
              private router: Router) {
    
  }
  onSignIn(form: NgForm){
    this.user.UserName=form.form.value.UserName;
    this.user.Password=form.form.value.Password;
    this.userService.Signin_Observe(this.user).subscribe((response) => {
        alert('login success');
        localStorage.setItem(LocalStorageKey.USER_NAME, response.body.userName)
        localStorage.setItem(LocalStorageKey.USER_ID, response.body.id)
        localStorage.setItem(LocalStorageKey.STREAM_KEY, response.body.streamInfo.stream_token)
        localStorage.setItem(LocalStorageKey.IsOnStream, response.body.streamInfo.status)
        this.router.navigate(['']);
    },
    (error) => {
      alert('wrong information')
    })
  }
}
