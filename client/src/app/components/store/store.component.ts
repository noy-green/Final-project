import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MainService } from 'src/app/services/main.service';
import { AdminService } from 'src/app/services/admin.service';



@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor(public us : UserService, public ms: MainService, public as : AdminService) { }
   
  showFiller : boolean = false;
  ngOnInit(): void {
    this.us.in_store = true
  }

 


  
 


}
