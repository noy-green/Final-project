import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, public r: Router) { }

  baseUrl: string = "http://localhost:1000/user"
  loggedUser : any
  cart : any
  cart_exist : boolean = false
  msg_login : any
  status : any
  admin : boolean = false
  in_store : boolean = false
  




  login(body) {
    return this.http.post(this.baseUrl + '/login', body, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  logOut() {
    localStorage.removeItem("token")
    localStorage.removeItem("date")
    localStorage.removeItem("user")
    this.loggedUser = undefined
    this.msg_login = undefined
    this.admin = false
    this.status = ''
    this.r.navigateByUrl('/login')
  }

  check_exist_cart(user_id){
    return this.http.get(this.baseUrl + '/check_if_exist_cart/'+ user_id)
  }

  open_cart(body){
    return this.http.post(this.baseUrl +'/open_cart',JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })

  }

  add_or_remove_product_from_cart(body){
    return this.http.put(this.baseUrl +'/add_or_remove_product_from_cart',JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  remove_product_from_cart(body){
    return this.http.put(this.baseUrl +'/remove_product_from_cart',JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  clean_the_cart(body){
    return this.http.put(this.baseUrl +'/remove_all_products',JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  first_register(body){
    return this.http.post(this.baseUrl +'/register_first_step',JSON.stringify(body), {
      headers: {
        "content-type": "application/json"
      }
    })
  }

  final_register(body){
    return this.http.post(this.baseUrl +'/final_register',JSON.stringify(body), {
      headers: {
        "content-type": "application/json"
      }
    })
  }

  open_order(body){
    return this.http.post(this.baseUrl +'/open_order',JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })

  }

  check_cart(){
    console.log(this.loggedUser)
    this.check_exist_cart(this.loggedUser[0]._id).subscribe(
      (res: any) => {
        console.log(res.msg,res.msg.length,"noyyyyy")
        if (res.msg.length != 0) {
          console.log("2", "us-cc")
          this.cart = res.msg[0]
          this.cart_exist = true
          this.status = "Resume shoping"
          this.msg_login = "There is an acrive cart from date :" + moment(this.cart.cteationDate).format('DD/MM/YYYY') + "total price" + this.cart.price
        } else {
          this.get_orders_by_user().subscribe(
            (res:any)=>{
              if(res.length!=0){
                console.log(res)
                this.msg_login = "Your last order was in: "+moment(res[res.length-1].cteationDate).format('DD/MM/YYYY')
                this.status = "Start shoping"
              }else{
                this.status = "Start shoping"
                this.msg_login = "Welcome to your first purchase!"
              }
            }
          )
         
        }
      }
    )
  }

  delete_cart(body){
    return this.http.put(this.baseUrl +'/delete_cart',JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }


  get_orders_by_user(){
    return this.http.get(this.baseUrl + '/allOrders/'+ this.loggedUser[0]._id)
  }

 
}
