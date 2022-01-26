import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from './services/cart-service.service';
import { ModalManager } from 'ngb-modal';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  @ViewChild('myModal') myModal: any;
  private modalRef: any;
  public cartTotal: Observable<any> | undefined;
  public user: String | undefined |null;
  public isCollapsed = false;
  public orders: number | undefined;

  constructor(private cartService: CartService, private modalService: ModalManager , private loginService: LoginService){}
  ngOnInit(): void {
    this.loginService.order.subscribe(res=> this.orders = res.length);
    this.cartTotal = this.cartService.cartTotal;
    this.loginService.loggedInUser?.subscribe(res=> this.user = res);
  }

  openModal(){
    this.modalRef = this.modalService.open(this.myModal, {
        size: "md",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    })
}
closeModal(user: String){
    this.loginService.login(user);
    this.modalService.close(this.modalRef);
}

toggleCollapse(){
  this.isCollapsed = !this.isCollapsed;
}

logOff(){
  this.loginService.logOff();
  this.toggleCollapse();
}


}
