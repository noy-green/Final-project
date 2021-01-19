import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-recipt',
  templateUrl: './recipt.component.html',
  styleUrls: ['./recipt.component.css']
})
export class ReciptComponent implements OnInit {

  constructor(public ms: MainService, public us: UserService,) { }


  displayedColumns: string[] = ['name', 'price', 'quantity','price per product'];
  dataSource : any
 
  

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.us.loggedUser, this.ms.product_in_cart)
      
      this.dataSource = this.ms.product_in_cart
      console.log(this.dataSource)
    }, 1000);
    
    // console.log(this.us.loggedUser, this.ms.product_in_cart)
    // if(this.us.cart!=undefined){
      
    //   this.dataSource =this.ms.product_in_cart
    
    //   console.log(this.us.loggedUser, this.ms.product_in_cart)
    // }else{
    //   return
    // }

  }

}
