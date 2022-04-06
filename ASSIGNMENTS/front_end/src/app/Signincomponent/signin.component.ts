import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signincomponent',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class Signincomponent implements OnInit {
  @ViewChild("formvalue")
  signin!: NgForm;

  userdata = {
    email:"",
    pass:""
  }

  constructor(private userservice : UserService) { }

  ngOnInit(): void {
  }



  onsubmit(){
   this.userdata.email = this.signin.value.email
   this.userdata.pass =this.signin.value.password
   this.userservice.GetUser(this.userdata.email,this.userdata.pass)
   this.signin.reset()
   if(this.userservice.Accessstatus == false){
    (document.getElementById('error') as HTMLImageElement).textContent = "User Not Found!!";
   }

  }

}


