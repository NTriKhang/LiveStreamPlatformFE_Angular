import { Component } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/service/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user: User= new User()
  constructor(private userService: UserService, private router: Router) {
    
  }
  onSignUp(form: NgForm){
    this.user.UserName=form.form.value.UserName;
    this.user.Password=form.form.value.Password;
    let confirmPassword: string = form.form.value.ConfirmPassword;
    if(this.user.Password == confirmPassword){
      this.userService.SignUp_Observe(this.user).subscribe(
        (response) => {
          if(response.ok){
            alert("sign up successfully")
            this.router.navigate(['/login']);
          }
          else{
            alert("505 internal server")
          }
        },
        (error) => {
          console.log(error);
        }
      )
    }
    else{
      alert("wrong password confirm")
    }
    console.log(this.user)
    
  }
}
