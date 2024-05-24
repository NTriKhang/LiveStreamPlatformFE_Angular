import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { SignalRService } from '../../core/service/signal-r.service';
import test from 'node:test';
import { sign } from 'node:crypto';
import { LocalStorageKey } from '../../core/constant/LocalStorageKey';
import { VideoService } from '../../core/service/video.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  userName:string
  streamKey: string
  listVideo: Array<any>

  constructor(private router: Router, private videoService: VideoService){
    this.listVideo = [];
  }
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined' && !localStorage.getItem(LocalStorageKey.USER_NAME)) {
      this.router.navigate(['/login'])
    }
    this.userName = localStorage.getItem(LocalStorageKey.USER_NAME)
    this.streamKey = localStorage.getItem(LocalStorageKey.STREAM_KEY)
    this.videoService.GetVideos(1).subscribe(res => {
      if(res.status === 200){
        this.listVideo = res.body
      }
    })
  }
}
