import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { JoinComponent } from './pages/join/join.component';
import { HeaderComponent } from './pages/header/header.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { InitStreamComponent } from './pages/init-stream/init-stream.component';
import { StreamComponent } from './pages/stream/stream.component';
import { ChatLiveComponent } from './pages/chat-live/chat-live.component';
import { WatchComponent } from './pages/watch/watch.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'initStream', component: InitStreamComponent, canDeactivate : [(comp: InitStreamComponent) => {
    // if(!comp.canExit())
    // {
    //   alert("Should stop streaming before quit")
    //   return false;
    // }
    return true;
  }]},
  {path: 'stream', component: StreamComponent, },
  {path: 'watch', component: WatchComponent},
  {path: 'watch/:videoId', component: WatchComponent},
  {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    SignInComponent,
    JoinComponent,
    HeaderComponent,
    PageNotFoundComponent,
    InitStreamComponent,
    StreamComponent,
    ChatLiveComponent,
    WatchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)                              
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
