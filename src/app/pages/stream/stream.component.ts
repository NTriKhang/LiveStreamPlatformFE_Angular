import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import Hls from "hls.js"
import { HlsService } from '../../core/service/hls.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { LocalStorageKey } from '../../core/constant/LocalStorageKey';
import { Room } from '../../core/models/room';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrl: './stream.component.css'
})
export class StreamComponent implements AfterViewInit {
  @ViewChild("video_stream") video: ElementRef
  room: Room

  constructor(private hlsService: HlsService, private route: ActivatedRoute) {
    
  }
  ngOnInit() {
    // Retrieve the passed object from navigation extras
    this.route.params.subscribe(params => {
      const navigationState = window.history.state;
      const passedObject = navigationState.data;
      console.log(passedObject)
      this.room = passedObject
      console.log(this.room)
    });
  }
  ngAfterViewInit(): void {
    this.hlsService.initHlsStream(this.room.streamKey, this.video)
  }
}
