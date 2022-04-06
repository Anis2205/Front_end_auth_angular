import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Signincomponent } from './Signincomponent/signin.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { Authservice } from './service/auth.service';

const appRoutes : Routes = [

  {
    path : '', component : HomeComponent
  },
  {
    path: 'login', component : Signincomponent
  },
  {
    path: 'signup', component : SignupComponent
  },
  {
    path: 'profile', component : ProfileComponent , canActivate : [Authservice]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    Signincomponent,
    SignupComponent,
    ProfileComponent,
    HomeComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
