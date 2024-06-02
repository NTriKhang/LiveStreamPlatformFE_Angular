import { Component, ElementRef, ViewChild } from '@angular/core';
import { VideoService } from '../../core/service/video.service';
import { Observable, interval } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Utitlity } from '../../utilities/Utility';
import { environment } from '../../../environments/environment.development';
import { HlsService } from '../../core/service/hls.service';
import { NavigationExtras, Router } from '@angular/router';
import { IDeactiveComponent } from '../../core/guards/stream.guard';
import { LocalStorageKey } from '../../core/constant/LocalStorageKey';
import { SignalRService } from '../../core/service/signal-r.service';
import { BitrateOptions, IMediaElement, VgMediaDirective } from '@videogular/ngx-videogular/core';
import Swal from 'sweetalert2';
import { Room } from '../../core/models/Room';

@Component({
  selector: 'app-init-stream',
  templateUrl: './init-stream.component.html',
  styleUrl: './init-stream.component.css'
})
export class InitStreamComponent implements IDeactiveComponent {
  /**
   *
   */

  @ViewChild("video") video: ElementRef

  Countdown: number = 15;
  Thumbnail: File;
  IsPublic: boolean = false;
  constructor(private videoService: VideoService, private hslService: HlsService,
    private router: Router, private signalrService: SignalRService) {
    this.signalrService.streamState.subscribe(message => {

      if (message === 'Streaming') {
        let startCountDown = interval(1000).subscribe(() => {
          this.Countdown--;
          if (this.Countdown === 0) {
            startCountDown.unsubscribe();
            this.hslService.initHlsStream(localStorage.getItem(LocalStorageKey.STREAM_KEY), this.video)
            localStorage.setItem(LocalStorageKey.IsOnStream, 'true');
          }
        })
      }
      else if (message === '200') {
        alert("Stop streaming successfully");
      }
    })

  }

  canExit() {
    console.log(localStorage.getItem(LocalStorageKey.IsOnStream))
    console.log(this.IsPublic)
    if (localStorage.getItem(LocalStorageKey.IsOnStream) === 'true' && !this.IsPublic) {
      return false;
    }
    else {
      return true;
    }
  }

  getFiles(event) {
    this.Thumbnail = event.target.files[0];
  }
  onPublic(form: NgForm) {
    if (form.value.Thumbnail == '') {
      alert("you need to choose a thumbnail")
      return;
    }

    const formData = new FormData();
    formData.append('thumbnail', this.Thumbnail, this.Thumbnail.name);
    const streamInfo = {
      title: form.value.Title,
      description: form.value.Desciprtion,
      user_id: localStorage.getItem(LocalStorageKey.USER_ID)
    }
    // const streamInfo : Room = {
    //   RoomKey: 'room key',
    //   Status: 'opening',
    //   Video: {
    //     Id: "id",
    //     User_id: 'user id',
    //     Title: 'tile 1',
    //     Description: "I have a feeling the boss won’t be happy about this. Are you sure you don't have anything bigger?",
    //     Thumbnail: 'thumb',
    //     Time: new Date(),
    //     Like: 0,
    //     View: 0
    //   }
    // }
    formData.append('streamInfo', JSON.stringify(streamInfo))
    this.videoService.OnStream(formData).subscribe(
      (res) => {
        console.log(res);
        this.IsPublic = true;
        let navigationExtras: NavigationExtras = {
          state:{
            data: res
          }
        }
        this.router.navigate(['/stream'], navigationExtras)
      },
      (err) => {
        console.error(err);
        alert("Something is wrong");
      }
    )
  }
}
