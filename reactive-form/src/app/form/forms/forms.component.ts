import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor() { }
  genders=['Male','Female']
  signupform! : FormGroup 
  forbiddenusernames = ['anisa']
  ngOnInit(): void {
    this.signupform = new FormGroup(
      {
        'userdata':new FormGroup({
          'username':new FormControl(null,[Validators.required,this.forbiddennames.bind(this)]),
          'email':new FormControl(null,[Validators.required,Validators.email],this.forbiddenemail()),
        }),
     
        'gender':new FormControl(),
        'hobbies':new FormArray([])
      }
    )
    this.signupform.statusChanges.subscribe(
      (status)=>{
        console.log(status)
      }
    )
    this.signupform.valueChanges.subscribe(
      (value)=>{
        console.log(value)
      }
    )
  //patch value for some of the field for all field setvalue
    this.signupform.patchValue({
      'userdata':{
        'username':'anisa1',
        'email':'anisa2@gmail.com'
      },
      'gender':'Female'
    })
  }
  onsubmit(){
    console.log(this.signupform)
    this.signupform?.get('userdata.username')?.reset()
  }
  addhobby(){
    const control = new FormControl(null,Validators.required);
     (<FormArray>this.signupform.get('hobbies')).push(control)
  }

  forbiddennames(control: FormControl) {
    if (this.forbiddenusernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenemail(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null>=> {
      const promise = new Promise<any>((resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'test@test.com') {
            resolve({'emailIsForbidden': true});
          } else {
            resolve(null);
          }
        }, 1500);
      });
      return promise;
    };
  }



}
