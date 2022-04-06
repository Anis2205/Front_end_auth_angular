import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor(private userservice: UserService) {}

  @ViewChild('formvalue')
  signup!: NgForm;

  user = {
    name: '',
    email: '',
    password: '',
    phone: 0,
    gender: 'Female',
    relationshipstatus: '',
    occupation: '',
  };

  onsubmit() {
    this.user.name = this.signup.value.user;
    this.user.password = this.signup.value.password;
    this.user.email = this.signup.value.email;
    this.user.phone = this.signup.value.phone;
    this.user.gender = this.signup.value.gender;
    this.user.occupation = this.signup.value.occupation;
    this.user.relationshipstatus = this.signup.value.rs;
    this.userservice.AddUser(this.user);
    this.signup.reset();
  }

  ngOnInit(): void {}
}
