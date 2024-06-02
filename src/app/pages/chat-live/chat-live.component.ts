import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, viewChild } from '@angular/core';
import { ChatliveService } from '../../core/service/chatlive.service';
import { ChatLive } from '../../core/models/ChatLive';
import { LocalStorageKey } from '../../core/constant/LocalStorageKey';

@Component({
  selector: 'app-chat-live',
  templateUrl: './chat-live.component.html',
  styleUrl: './chat-live.component.css'
})
export class ChatLiveComponent implements AfterViewInit, OnInit {

  @Input() roomId : string;
  @ViewChild("chat_box") chatBox : ElementRef;
  chatMessages_v2 : ChatLive[];
  chatMessages = [
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
  ];

  constructor(private chatliveService: ChatliveService) {
    this.chatMessages_v2 = []
    chatliveService.chatState.subscribe(newChat => {
      this.chatMessages_v2.push(newChat);
      console.log(this.chatMessages_v2)
    })
  }
  ngAfterViewInit(): void {
    this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
  }

  ngOnInit() {
    this.chatliveService.startConnection()
    setTimeout(() => {
      console.log(this.roomId)
      this.chatliveService.roomConnect(this.roomId)
    }, 5000);
  }
  onSendChat(form: any){
    if (form.valid) {
      const chatInputValue = form.value.chatInput;
      // Handle the submitted data
      console.log('Message:', chatInputValue);

      // Add the new message to the chatMessages array or handle it as needed
      const newChat = new ChatLive
      (
        this.roomId, localStorage.getItem(LocalStorageKey.USER_ID),localStorage.getItem(LocalStorageKey.USER_NAME), 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s',chatInputValue
      )
      this.chatliveService.sendChat(newChat)
      // Clear the input field
      form.resetForm();
    }
  }
}
