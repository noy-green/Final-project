import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import * as moment from 'moment'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private r: Router,
    public us: UserService,
    public ms: MainService
  ) { }

  myForm: FormGroup
  num_of_products: any
  num_of_orders: any
  msg: string


  ngOnInit(): void {
    this.us.in_store = false
    console.log(this.us.loggedUser)
    if (this.us.loggedUser != undefined) {
      console.log(this.us.loggedUser)
      if(this.us.loggedUser[0].role == "user"){
      this.us.check_cart()
    }
    }
    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
    this.ms.get_num_of_orders().subscribe(
      res => {
        this.num_of_orders = res
        console.log(res)

      }

    )
    this.ms.get_num_of_products().subscribe(
      res => {
        this.num_of_products = res
        console.log(res)
      }
    )
  }

  move_to_store() {
    // this.us.in_store = true
    this.r.navigateByUrl('/store')
  }


  handleSubmit() {
    console.log(this.myForm.value)
    this.us.login(this.myForm.value).subscribe(
      (res: any) => {
        console.log(res)
        if (!res.error) {
          console.log(res.result)
          localStorage.token = res.token
          localStorage.date = Date.now()
          localStorage.user = JSON.stringify(res.result)
          this.us.loggedUser = (res.result)
          console.log(this.us.loggedUser)
          this.msg=''
          this.ms.login = true
          setTimeout(() => {
            this.us.logOut()
          }, 600000);
          if (this.us.loggedUser[0].role == "admin") {
            this.us.admin = true
            this.us.status = "Go to the store"
            this.r.navigateByUrl('/store')
            this.us.in_store = true
          }
          if (this.us.loggedUser[0].role == "user") {
            this.us.check_cart()
          }
         

        } else {
          this.msg = res.msg
        }
      },
      err => {
        console.log(err)
      }
    )
  }








}
