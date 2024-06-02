import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { APIEndpoint } from '../constant/APIEndpoint';
import { response } from 'express';
import { error } from 'console';
import { env } from 'process';
import { Room } from '../models/Room';
import { Video } from '../models/Video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private httpclient: HttpClient) { }

  GenerateKey() : Observable<any> {
    return this.httpclient.get(environment.backend_url + APIEndpoint.video.generateKey,{withCredentials:true, observe: 'response'})
  }
  OnStream(formData: FormData) : Observable<Room>{
    return this.httpclient.post<Room>(environment.backend_url + APIEndpoint.video.on_stream, formData ,{withCredentials: true, observe: 'response'})
        .pipe(map(response => response.body))
  }
  GetVideos(page) : Observable<any>{
    return this.httpclient.get(environment.backend_url + APIEndpoint.video.getVideos + page, {withCredentials: true, observe: 'response'})
  }
  GetVideo(videoId:string): Observable<Video>{
    return this.httpclient.get<Video>(environment.backend_url + APIEndpoint.video.getVideo + videoId, {observe: 'response'})
      .pipe(
        map(res => res.body)
      )
  }
  UploadVideo(uploadVideo) : Observable<any>{
    return this.httpclient.post(environment.backend_url + APIEndpoint.video.uploadVideo, uploadVideo, {withCredentials: true, observe: 'response'})
  }
}
