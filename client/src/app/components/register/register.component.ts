import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(

    private r: Router,
    public us: UserService,
    public ms: MainService,
    private _formBuilder: FormBuilder
  ) { }

  // isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  pattern_email: any = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/
  pattern_ID: any = /^[0-9]{9}$/
  msg: any
  validation_step1: boolean = false
  validation_step2: boolean = false


  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      user_id: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      f_name: ['', Validators.required],
      l_name: ['', Validators.required]
    });
  }



  // first_step() {

  //   if (this.firstFormGroup.value.email.match(this.pattern_email)) {
  //     if (this.firstFormGroup.value.user_id.match(this.pattern_ID)) {
  //       if (this.firstFormGroup.value.password == this.firstFormGroup.value.passwordConfirm) {
  //         this.us.first_register({ user_id: this.firstFormGroup.controls.user_id.value }).subscribe(
  //           (res: any) => {
  //             console.log(res)
  //             if (res.msg == true) {
  //               this.validation_step1 = true
  //             } else {
  //               this.msg = "this ID is allready in use"
  //             }
  //           }
  //         )
  //       }
  //       else {
  //         this.msg = "Incorrect password verification"
  //       }
  //     } else {
  //       this.msg = "Incorrect ID"

  //     }
  //   } else {
  //     this.msg = "Incorrect email"
  //   }

  // }


  async first_step() {

    if (!this.firstFormGroup.value.user_id.match(this.pattern_ID)) {
      this.msg = "Incorrect id"
      return;
    }

    if (this.firstFormGroup.value.password !== this.firstFormGroup.value.passwordConfirm) {
      this.msg = "Incorrect password verification";
      return;
    }

    if (!this.firstFormGroup.value.email.match(this.pattern_email)) {
      this.msg = "Incorrect email";
      return;
    }

    this.us.first_register({ user_id: this.firstFormGroup.controls.user_id.value }).subscribe(
      (res: any) => {
        if (res.msg == true) {
          this.msg =''
          this.validation_step1 = true
        }
      }
    )
  }


  click() {
    let element: HTMLElement = document.getElementById('next') as HTMLElement;
    element.click()
    return
  }

  final_register() {
    console.log(this.firstFormGroup.value, this.secondFormGroup.value)
    this.us.final_register(Object.assign(this.firstFormGroup.value, this.secondFormGroup.value)).subscribe(
      (res: any) => {
        console.log(res)
        localStorage.token = res.token
        localStorage.date = Date.now()
        localStorage.user = JSON.stringify(res.result)
        const temp = []
        temp.push(res.result)
        this.us.loggedUser = temp
        console.log(this.us.loggedUser)
        this.ms.login = true
        this.r.navigateByUrl('/login')





      }
    )
  }

}
