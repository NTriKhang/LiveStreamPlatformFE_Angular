import { Component } from '@angular/core';
import { SignalRService } from './core/service/signal-r.service';
import { LocalStorageKey } from './core/constant/LocalStorageKey';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private signalRService: SignalRService){

  }
  ngOnInit() {
    if(localStorage.getItem(LocalStorageKey.USER_ID)){
      this.signalRService.startConnection();
    }
  }
  title = 'FrontAng';
}
