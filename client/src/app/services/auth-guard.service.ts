import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router'
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private us : UserService , private r : Router) { }

  canActivate() : boolean{
    if(this.us.loggedUser != undefined ){
      return true
    }
    alert(" no user logged in ")
    this.r.navigateByUrl('/login')
    return false
  }
}


