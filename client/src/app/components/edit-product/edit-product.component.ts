import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  constructor(
    private r: Router,
    public us: UserService,
    public ms: MainService,
    private _formBuilder: FormBuilder,
    public as: AdminService
  ) { }

  FromGroup: FormGroup;


  ngOnInit(): void {
    console.log("Esitttt", this.as.product_To_edit)
    this.FromGroup = this._formBuilder.group({
      name: [this.as.product_To_edit.name, Validators.required],
      price: [this.as.product_To_edit.price, Validators.required],
      category_id: [this.as.product_To_edit.category_id, Validators.required],
      imagePath: [this.as.product_To_edit.imagePath, Validators.required],
      description: [this.as.product_To_edit.description, Validators.required]
    });
  }
  // name, category_id, price, imagePath, quantity, description 

  handleSubmit() {
    this.as.editProduct(this.FromGroup.value).subscribe(
      (res: any) => {
        if (!res.error) {
          // this.as.product_To_edit = res.product
          this.ms.get_products_by_category("5ff9bd08fcf45632ccf886d1").subscribe(
            (res:any)=>{console.log(res)
            this.ms.product_to_display = res
            this.as.edit_or_add = false
            this.as.sidenav = !this.as.sidenav}
          )
        } else {
          console.log(res.msg)
        }
      }
    )

  }
}

