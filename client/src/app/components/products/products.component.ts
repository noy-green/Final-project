import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(public ms: MainService, public dialog: MatDialog, public us: UserService, public as : AdminService) { }
  
  body : any
  quantity : any



  openDialog(product) {
    
    const dialogRef = this.dialog.open(DialogComponent)
    dialogRef.afterClosed().subscribe(
      res => {
        this.quantity = res
        console.log(this.us.loggedUser)
        console.log(this.us.cart_exist)
        if(!this.us.cart_exist){
          this.us.open_cart({id :this.us.loggedUser[0]._id}).subscribe(
            (res:any) => {this.us.cart = res.cart
              this.us.cart_exist = true
              console.log(this.us.cart)
              this.body = { cart_id: this.us.cart._id, product_id: product._id, quantity: this.quantity , price_per_product: product.price * this.quantity }
              this.us.add_or_remove_product_from_cart(this.body).subscribe(
                (res:any) => {console.log(res)
                  this.us.cart = res.cart
                  this.ms.get_all_Products_by_Cart()}

              )}
              
              
         )
        }
   
        else{
        this.body = { cart_id: this.us.cart._id, product_id: product._id, quantity: this.quantity , price_per_product: product.price * this.quantity }
        this.us.add_or_remove_product_from_cart(this.body).subscribe(
          (res:any) =>{this.us.cart = res.cart
          this.ms.get_all_Products_by_Cart()}
        )
      }
       
      }
    )
  }


  ngOnInit(): void {

    this.ms.get_categories().subscribe(
      res => {
        this.ms.categories = res
        console.log(this.ms.categories)
        this.change_category('5ff9bd08fcf45632ccf886d1')
       
      }

    )
  }

  change_category(category_id) {
    this.ms.get_products_by_category(category_id).subscribe(
      res => {
        this.ms.product_to_display = res
        console.log(res)
      }
    )

  }




}
