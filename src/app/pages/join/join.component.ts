import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RoomService } from '../../core/service/room.service';
import { NavigationExtras, Router } from '@angular/router';
import { error } from 'console';
import { ChatliveService } from '../../core/service/chatlive.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent implements AfterViewInit {
  constructor(private roomService: RoomService, private router: Router, private chatliveService: ChatliveService) {

  }
  @ViewChild("closeBtn") closeBtn: ElementRef<HTMLButtonElement>

  ngAfterViewInit() {
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async OnRequest(roomKey: string) {

    this.roomService.OnGetRoom(roomKey).subscribe(
      res => {
        let navigationExtras: NavigationExtras = {
          state: {
            data: res
          }
        }
        this.chatliveService.startConnection()
        this.router.navigate(['/watch'], navigationExtras)
        this.closeBtn.nativeElement.click();
      },
      err => {
        alert("Can't find available room")
      }
    )
  }
}
