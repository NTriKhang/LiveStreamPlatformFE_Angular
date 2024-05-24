import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from '../../../environments/environment.development';
import { APIEndpoint } from '../constant/APIEndpoint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpclient: HttpClient) { }
  
  SignUp_Observe(user: User) : Observable<HttpResponse<any>>{
    return this.httpclient.post(environment.backend_url + APIEndpoint.user.signUp, user, {observe: 'response'});
  }
  Signin_Observe(user:User) : Observable<HttpResponse<any>>{
    return this.httpclient.post(environment.backend_url + APIEndpoint.user.signIn, user, {observe: 'response', withCredentials:true});
  }
}
