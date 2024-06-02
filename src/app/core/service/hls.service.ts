import { ElementRef, Injectable } from '@angular/core';
import Hls from "hls.js"

@Injectable({
  providedIn: 'root'
})
export class HlsService {
  private hls: Hls
  private mediaAttached: boolean = false;

  constructor() { 
    this.hls = new Hls();
  }

  initHlsStream(streamKey: string, video: ElementRef) {
    const defaultOption : any = {};
    let videoSrc = "http://localhost:8888/hls/index.m3u8"; 
    //let videoSrc = "http://localhost:8888/hls_1080/test2/index.m3u8";

    this.hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log('video and hls.js are now bound together !');
    });
    this.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log(
        'manifest loaded, found ' + data.levels.length + ' quality level',
      );
    });
    this.hls.on(Hls.Events.ERROR, function (event, data) {
      console.log(data)
    });
    this.hls.on(Hls.Events.BUFFER_EOS, function(event){
      console.log("Streaming end");
    })
    videoSrc = videoSrc.replace("index", streamKey);
    this.hls.loadSource(videoSrc);

    const hls_video = video.nativeElement;
    if (this.mediaAttached) {
      this.hls.detachMedia();
    }
    this.hls.attachMedia(hls_video);
  }

  initHlsVideo(videoPath: string, videoElement: ElementRef){
    
    this.hls.on(Hls.Events.MEDIA_ATTACHED, function () {
      console.log('video and hls.js are now bound together !');
    });
    this.hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log(
        'manifest loaded, found ' + data.levels.length + ' quality level',
      );
    });
    this.hls.on(Hls.Events.ERROR, function (event, data) {
      //console.log(data)
    });
    this.hls.on(Hls.Events.BUFFER_EOS, function(event){
      //console.log("Streaming end");
    })
    this.hls.loadSource(videoPath);

    const hls_video = videoElement.nativeElement;
    if (this.mediaAttached) {
      this.hls.detachMedia();
    }
    this.hls.attachMedia(hls_video);
    // if (Hls.isSupported()) {
    //   this.hls.loadSource(videoPath);
    //   this.hls.attachMedia(videoElement.nativeElement);
    //   this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //     videoElement.nativeElement.play();
    //   });
    // } else if (videoElement.nativeElement.canPlayType('application/vnd.apple.mpegurl')) {
    //   // Some browsers (like Safari) support HLS natively
    //   videoElement.nativeElement.src = videoPath;
    //   videoElement.nativeElement.addEventListener('loadedmetadata', () => {
    //     videoElement.nativeElement.play();
    //   });
    // }
  }

}
