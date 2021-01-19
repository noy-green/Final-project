import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

import { MainService } from './services/main.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  constructor(public us: UserService, public ms: MainService, public r: Router) { }
  title = 'client';
  value = '';

  ngOnInit(): void {
    if (localStorage.token != undefined) {

      const token = localStorage.token
      const date = localStorage.date
      const user = JSON.parse(localStorage.user)
      console.log(token, date, user)
      console.log((Date.now() - date), ((Date.now() - date) / 1000) / 60)
      if (((Date.now() - date) / 1000) / 60 <= 10) {
        this.us.loggedUser = user
        if (this.us.loggedUser[0].role == "admin") {
          this.us.admin = true
          this.us.status = "Go to the store"
        }
        if (this.us.loggedUser[0].role == "user") {
          this.us.check_cart()
        }
        this.ms.login = true
        this.ms.get_all_Products_by_Cart()
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("date")
        localStorage.removeItem("user")
      }
    }
  }

  handle_search() {
    this.ms.search(this.value).subscribe(
      (res: any) => {
        if (res.length != 0) {
          this.ms.product_to_display = res

        }
      }

    )
  }
}
