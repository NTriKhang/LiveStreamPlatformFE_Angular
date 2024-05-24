import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIEndpoint } from '../constant/APIEndpoint';
import { LocalStorageKey } from '../constant/LocalStorageKey';
import Swal from 'sweetalert2';
import { VideoService } from './video.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;

  constructor(private httpClient: HttpClient, private videoService: VideoService) {
  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.hub_url)
      .withAutomaticReconnect()
      .build();
    this.onStreamingListener();
    this.onStopStreamingListener();
    this.hubConnection.start().then(() => {
      console.log("Connected to signalR hub")
    }
    ).catch(err => console.error('Error connecting to SignalR hub:', err));
  }

  onStopStreamingListener = () => {
    this.hubConnection.on('onStopStreaming', (message: string) => {
      if (message === '200') {
        let timerInterval;
        Swal.fire({
          title: "We are modifying your data!",
          html: "This will close when we done.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
      else {
        Swal.fire({
          title: "Do you want to save the changes?",
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: "Save",
          denyButtonText: `Don't save`
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            let uploadVideo = {
              streamKey: message,
              option: 'Upload'
            }
            this.videoService.UploadVideo(uploadVideo).subscribe(x => {
              Swal.fire("Saved!", "", "success");
            })
          } else if (result.isDenied) {
            let uploadVideo = {
              streamKey: message,
              option: 'Remove'
            }
            this.videoService.UploadVideo(uploadVideo).subscribe(x => {
              Swal.fire("Done!", "", "success");
            })
          }
        });
      }
      localStorage.setItem(LocalStorageKey.IsOnStream, 'false');
    })
  }
  onStreamingListener = () => {
    this.hubConnection.on('onStartStreaming', (message: string) => {
      this.streamStateChange(message);
    })
  }
  ///////////////////////////

  private messageSource = new BehaviorSubject('default message');
  streamState = this.messageSource.asObservable();

  streamStateChange(message: string) {
    this.messageSource.next(message)
  }
}
