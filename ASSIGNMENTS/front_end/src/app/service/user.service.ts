import { EventEmitter, Injectable, Output } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root',
})

export class UserService{
  constructor(private route : Router){

  }
  private Userdata : User[] = []
  Accessstatus = false
  @Output() profile : User | undefined
  // @Output() profileevent = new EventEmitter();
  AddUser(user:User){
    this.Userdata.push(user)
  }

  GetUser(mail : String,pass : String){
    if(this.Userdata.find(e => e.email === mail) && this.Userdata.find(e => e.password === pass)){
     this.Accessstatus = true
     this.route.navigate(['/profile'])
     if(this.Accessstatus){
     this.profile = this.Userdata.find(e => e.email === mail)
    //  this.profileevent.emit(this.Userdata.find(e => e.email === mail))
     }

    }
    else{
      this.Accessstatus = false
    }
  }

}
