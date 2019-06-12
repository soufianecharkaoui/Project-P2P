import { ChatComponent } from './chat/chat.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes =[
    { 
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'signup',
      component: SignupComponent
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'chat/:id',
      component: ChatComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'users',
      component: UsersComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'userdetails/:id',
      component: UserdetailsComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: '', 
      redirectTo: 'home', 
      pathMatch: 'full' 
    }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
