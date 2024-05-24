import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Room } from '../../core/models/room';
import { Video } from '../../core/models/video';
import { HlsService } from '../../core/service/hls.service';
import { VideoService } from '../../core/service/video.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrl: './watch.component.css'
})
export class WatchComponent implements AfterViewInit {
  watchStateTemplate: string = "rewatch"
  @ViewChild("videoElement") videoElement: ElementRef

  room: Room

  constructor(private route: ActivatedRoute, private hlsService: HlsService, private videoService: VideoService) {

  }
  ngAfterViewInit(): void {
    if (this.watchStateTemplate === 'live') {
      this.hlsService.initHlsStream(this.room.streamKey, this.videoElement)
    }
    else if(this.watchStateTemplate === 'rewatch'){
      this.hlsService.initHlsVideo(`https://d1qbtoot6tfric.cloudfront.net/${this.room.video.id}/index.m3u8`, this.videoElement)
      // this.hlsService.initHlsVideo("http://localhost:8888/hls/ZCpWgqIXsmLGTf0I.m3u8", this.videoElement)
      //this.videoElement.nativeElement.src = "https://d9935rfqmx8z.cloudfront.net/66485d0545341f19d03bae6c/ZCpWgqIXsmLGTf0I.m3u8"
      //this.videoElement.nativeElement.load()
    }
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params['videoId'])
      if (params['videoId'] === undefined) {
        const navigationState = window.history.state;
        const passedObject = navigationState.data;
        if (passedObject !== undefined) {
          this.watchStateTemplate = "live"
          this.room = passedObject
        }
        else{
          alert("No video available")
        }
      }
      else {
        this.watchStateTemplate = "rewatch"
        this.videoService.GetVideo(params['videoId']).subscribe(
          res => {
            this.room = new Room(res)
          },
          err => {
            alert("Can't get video")
          }
        )
      }
    })
  }

}
