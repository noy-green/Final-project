import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogOrderComponent } from '../dialog-order/dialog-order.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  constructor(public us: UserService, public ms: MainService, private fb: FormBuilder, public dialog: MatDialog, private r: Router,) { }

  myForm: FormGroup
  today: any
  pattern: any = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
  msg: any
  body: any
  open: boolean = false
  value: string

  ngOnInit(): void {
    this.us.in_store = false
    this.myForm = this.fb.group({
      city: ['', Validators.required],
      street: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      creditCard: ['', Validators.required]
    })
    this.today = new Date().toISOString().split('T')[0];
  }

  handle_submit() {
    if (this.myForm.value.creditCard.match(this.pattern)) {
      console.log(true)
    }
  }

  city() {
    console.log(this.us.loggedUser)
    this.myForm.controls.city.setValue(this.us.loggedUser[0].city)
  }
  street() {
    this.myForm.controls.street.setValue(this.us.loggedUser[0].street)
  }

  handleSubmit() {
    console.log(this.myForm.value.deliveryDate)
    this.ms.check_Delivery_Date(this.myForm.value.deliveryDate).subscribe(
      (res: any) => {
        if (!res.msg) {
          this.msg = "This date is too busy, please choose another day"
        } else {
          console.log(this.us.cart._id)
          this.body = {
            user_id: this.us.loggedUser[0]._id, cart_id: this.us.cart._id, finel_price: this.us.cart.price,
            city: this.myForm.value.city, street: this.myForm.value.street, delivery_date: this.myForm.value.deliveryDate,
            last_4_digits_of_credit: this.myForm.value.creditCard.slice(-4)
          }
          this.us.open_order(this.body).subscribe(
            (res: any) => {
              console.log(res)
              this.open_dialog_order(this.msg)
            }
          )
       
        }

      }
    )
  }



  open_dialog_order(msg) {
    this.open = true
    const dialogRef = this.dialog.open(DialogOrderComponent)
    dialogRef.afterClosed().subscribe(
      res => {
        this.open = false
      })
  }


  handle_search() {
    console.log(this.value)
    
    const names = document.getElementsByClassName("name")
    console.log(names[0].textContent)
    console.log(names[0].textContent)
    for (let i = 0; i < names.length; i++) {
      names[i].innerHTML = names[i].textContent.replace(this.value, '<mark>' + this.value + '</mark>')
    }

  }

  clear() {
    const names = document.getElementsByClassName("name")
    console.log(names[0].textContent)
    for (let i = 0; i < names.length; i++) {
      names[i].innerHTML = names[i].textContent.replace('<mark>' + this.value + '</mark>',this.value)
    }
    this.value = ""

  }

  move_to_store(){
    this.us.in_store =true
    this.r.navigateByUrl('/store')
  }
}










