import { Component, ElementRef, ViewChild } from '@angular/core';
import { RoomService } from '../../core/service/room.service';
import { NavigationExtras, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrl: './join.component.css'
})
export class JoinComponent {
  constructor(private roomService: RoomService, private router: Router) {

  }
  @ViewChild("closeBtn") closeBtn: ElementRef<HTMLButtonElement>
  OnRequest(roomKey: string) {
    this.roomService.OnGetRoom(roomKey).subscribe(
      res => {
        let navigationExtras: NavigationExtras = {
          state: {
            data: res
          }
        }
        this.router.navigate(['/watch'], navigationExtras)
        this.closeBtn.nativeElement.click();
      },
      err => {
        alert("Can't find available room")
      }
    )
  }
}
