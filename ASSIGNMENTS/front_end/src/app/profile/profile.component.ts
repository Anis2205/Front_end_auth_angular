import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { User } from '../model/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  // subscribing : Subscription | undefined
  constructor(private route : Router,private userservice:UserService) {
    this.profile = this.userservice.profile
   }
   ngOnInit(): void {

   }

  //  ngOnInit() {
  //   this.subscribing = this.userservice.profileevent.subscribe(
  //     ((data:User) => {
  //     this.profile = data
  //     })
  //   )
  // }

  profile : User  | undefined



  Onlogout(){
    this.userservice.Accessstatus = false
    this.route.navigate(['/'])
  }

}
