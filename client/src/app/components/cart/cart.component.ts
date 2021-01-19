import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(public us: UserService, public ms: MainService, public dialog: MatDialog, public r: Router) { }


  body: any


  ngOnInit(): void {
    if (this.us.cart_exist) {
      this.ms.get_all_Products_by_Cart()
    }
  }



  openDialog(product) {
    const dialogRef = this.dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe(
      res => {
        this.body = { cart_id: this.us.cart._id, product_id: product._id, quantity: res, price_per_product: product.price * res }
        this.us.add_or_remove_product_from_cart(this.body).subscribe(
          (res: any) => {
            console.log(res.cart)
            this.us.cart = res.cart
            this.ms.get_all_Products_by_Cart()
          }
        )
      }
    )
  }


  remove_product_from_cart(p) {
    return this.us.remove_product_from_cart({ cart_id: this.us.cart._id, product_id: p._id, price_per_product: p.quantity_in_cart * p.price }).subscribe(
      (res: any) => {
        console.log(res)
        this.us.cart = res.result
        this.ms.get_all_Products_by_Cart()
      }
    )
  }

  clean_the_Cart() {
    return this.us.clean_the_cart({ cart_id: this.us.cart._id }).subscribe(
      (res: any) => {
        this.us.cart = res.result
        this.ms.get_all_Products_by_Cart()
      }
    )
  }

  move_to_order(){
    this.r.navigateByUrl('/order')
  }
}
