import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-chat-live',
  templateUrl: './chat-live.component.html',
  styleUrl: './chat-live.component.css'
})
export class ChatLiveComponent implements AfterViewInit {
  @ViewChild("chat_box") chatBox : ElementRef;
  chatMessages = [
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() },
    { senderName: 'Nguyen Tri Khang', senderAvatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv0mdBabVRdQA-9yRZXS0ug2rx5jCGYVQfXTHYDGJrbg&s', content: 'this is chat message', timestamp: new Date() }
  ];
  ngAfterViewInit(): void {
    console.log(this.chatBox)
    this.chatBox.nativeElement.scrollTop = this.chatBox.nativeElement.scrollHeight;
  }
}
