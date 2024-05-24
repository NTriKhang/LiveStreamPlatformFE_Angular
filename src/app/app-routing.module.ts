import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { InitStreamComponent } from './pages/init-stream/init-stream.component';
import { StreamComponent } from './pages/stream/stream.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  // {path: '', component: HomeComponent},
  // {path: 'login', component: SignInComponent},
  // {path: 'signup', component: SignUpComponent},
  // {path: 'initStream', component: InitStreamComponent},
  // {path: 'stream', component: StreamComponent, },
  // {path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
