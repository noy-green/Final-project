import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MainService } from 'src/app/services/main.service';
import { UserService } from 'src/app/services/user.service';



@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css']
})
export class DialogOrderComponent implements OnInit {

  constructor(public us : UserService, public ms : MainService, public r: Router) { }

  ngOnInit(): void {
  }
  create_recipt(){
    let element = document.getElementById('recipt')
    console.log(element)
    html2canvas(element).then((canvas)=>{
      let imgData = canvas.toDataURL('image/png')
      let doc = new jsPDF()
      let imgHeight = canvas.height*208/canvas.width
      doc.addImage(imgData, 0,0, 208, imgHeight)
      doc.save('image.pdf')
    })
  }


  close(){
    this.us.delete_cart({ id: this.us.cart._id }).subscribe(
           res => {
             console.log(res)

             this.us.cart = undefined
             this.us.cart_exist = false
             this.ms.product_in_cart = []
            //  this.ms.get_all_Products_by_Cart()
             this.r.navigateByUrl('/store')
          })
}

}
