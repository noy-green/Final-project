import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  baseUrl: string = "http://localhost:1000/main"
  // product_by_search : []
  product_to_display :any
  login : boolean = false
  all_products : any
  product_in_cart : any = []
  categories: any
 
  

  constructor(private http: HttpClient, public us: UserService,) { }

  
get_num_of_products(){
  return this.http.get(this.baseUrl+'/products/count')
}

get_num_of_orders(){
  return this.http.get(this.baseUrl+'/orders/all')
}

get_categories(){
  return this.http.get(this.baseUrl+'/category/all')
}

get_products_by_category(category_id){
  return this.http.get(this.baseUrl+'/products_by_category/'+ category_id)
}
get_all_products(){
  return this.http.get(this.baseUrl+'/products/all')
}

search(text){
  return this.http.get(this.baseUrl+'/search_product/' + text)
}


get_all_Products_by_Cart(){
  console.log("hi")
this.get_all_products().subscribe(
(res: any) => {
  // if(this.us.cart = undefined){
  //   return 
  // }
  this.all_products = res
  this.product_in_cart = this.all_products.filter(p => this.us.cart.products.some(p_id => p_id.product_id == p._id) )
  for (let i = 0 ; i < this.product_in_cart.length ; i ++){
      for (let j = 0; j<this.us.cart.products.length; j++){
        if (this.product_in_cart[i]._id==this.us.cart.products[j].product_id){
          console.log(this.product_in_cart[i])
          this.product_in_cart[i].quantity_in_cart = this.us.cart.products[j].quantity
        }
      }
    }
 
  console.log(this.product_in_cart)
}
)
}

check_Delivery_Date(date){
  return this.http.get(this.baseUrl+'/count_by_date/' + date)
}


}



