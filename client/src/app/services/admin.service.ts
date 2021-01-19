import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(public http : HttpClient) { }

  edit_or_add : boolean = false
  baseUrl: string = "http://localhost:1000/admin"
  product_To_edit: any
  sidenav :boolean = false

  addProduct(body) {
    return this.http.post(this.baseUrl + '/add_product', JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  editProduct(body) {
    return this.http.put(this.baseUrl + '/edit_product/'+ this.product_To_edit._id , JSON.stringify(body), {
      headers: {
        "content-type": "application/json",
        "Authorization": localStorage.token
      }
    })
  }

  change(button,p){
    console.log(button)
    if(button=="edit"){
      this.product_To_edit = p
      this.edit_or_add = true
      
    }else{
      this.edit_or_add = false
    }
    this.sidenav = !this.sidenav
    if(this.sidenav==false&&(this.edit_or_add==true)){
      this.edit_or_add = false
    }

  }
 
}
