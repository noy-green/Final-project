import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(
    private r: Router,
    public us: UserService,
    public ms: MainService,
    private _formBuilder: FormBuilder,
    public as: AdminService
  ) { }

  FromGroup: FormGroup;

  ngOnInit(): void {
    this.FromGroup = this._formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      category_id: ['', Validators.required],
      imagePath: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  // name, category_id, price, imagePath, quantity, description 

  handleSubmit() {
    this.as.addProduct(this.FromGroup.value).subscribe(
      (res: any) => {
        if (!res.error) {
          this.ms.get_products_by_category("5ff9bd08fcf45632ccf886d1").subscribe(
            res=>{console.log(res)
              this.ms.product_to_display = res
              this.as.edit_or_add = true
              // this.as.edit_or_add = false
              this.as.sidenav = !this.as.sidenav}
          )
        } else {
          console.log(res.msg)
        }
      }
    )

  }
}
