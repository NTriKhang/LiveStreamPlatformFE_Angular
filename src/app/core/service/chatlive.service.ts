import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'
import { environment } from '../../../environments/environment.development';
import { BehaviorSubject } from 'rxjs';
import { ChatLive } from '../models/ChatLive';

@Injectable({
  providedIn: 'root'
})
export class ChatliveService {
  private hubConnection: signalR.HubConnection;
  private bot = {
    name: 'BOT',
    image: 'https://img.freepik.com/free-vector/chatbot-chat-message-vectorart_78370-4104.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716854400&semt=ais_user',

  }
  constructor(private httpClient: HttpClient) {
  }
  public async startConnection() {

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.chat_hub_url)
      .withAutomaticReconnect()
      .build();

    this.onRoomConnected();
    this.onChatLive()
    this.onChatError()

    this.hubConnection.start().then(() => {
      console.log("Connected to signalR hub")
    }
    ).catch(err => console.error('Error connecting to SignalR hub:', err));
  }
  public onRoomConnected = () => {
    this.hubConnection.on('onRoomConnected', (message: string) => {
      console.log(message)
      this.chatStateChange(new ChatLive('','',this.bot.name,this.bot.image, message))
    });
  }
  public onChatLive = () => {
    this.hubConnection.on('onChatLive', (chat: ChatLive) => {
      console.log(chat)
      this.chatStateChange(chat)
    })
  }
  public onChatError = () => {
    this.hubConnection.on('onChatError', () => {
      alert("error on sending message")
    })
  }
  public async roomConnect(roomKey: string) {
    await this.hubConnection.invoke('ConnectToRoom', roomKey)
  }
  public async sendChat(chatLive : ChatLive){
    await this.hubConnection.invoke('SendChat', chatLive)
  }
  private chatSource = new BehaviorSubject<ChatLive>(new ChatLive('','',this.bot.name,this.bot.image,'send something'));
  chatState = this.chatSource.asObservable();

  chatStateChange(message: ChatLive) {
    this.chatSource.next(message)
  }
}
