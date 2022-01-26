import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalManager } from 'ngb-modal';
import { Product } from 'src/app/common/types/product';
import { CartService } from 'src/app/services/cart-service.service';
import { LoginService } from 'src/app/services/login.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  public cart: Product[]  = [];
  public total: any | undefined;
  @ViewChild('loginForm') loginForm: any;
  private modalRef: any;
  @ViewChild('confirmOrder') confirmOrder: any;
  public userName: String| undefined |null;


  constructor( private router: Router, private route: ActivatedRoute, private cartService: CartService, private modalService: ModalManager,private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.loggedInUser?.subscribe(res=>this.userName = res);
    this.cartService.getCart()?.subscribe(x=>{
      this.cart=x;
    });
    this.cartService.getTotal()?.subscribe(x=>{
      this.total=x;
    })
  }

  public updateCart(e: any){
    if(e.quantity == 0){
      this.cartService.removeFromCart(e);
    }
    else{
      this.cartService.updateCart(e);
    }
  }

  openModal(){
    // console.log(this.userName,'login');
    if(!this.userName){
    this.modalRef = this.modalService.open(this.loginForm, {
        size: "md",
        modalClass: 'mymodal',
        hideCloseButton: false,
        centered: false,
        backdrop: true,
        animation: true,
        keyboard: false,
        closeOnOutsideClick: true,
        backdropClass: "modal-backdrop"
    });
  }
  else{
    this.modalRef = this.modalService.open(this.confirmOrder, {
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
}


closeModal(user: String){
    this.loginService.login(user);
    this.modalService.close(this.modalRef);
}

completeOrder(){
  this.modalService.close(this.modalRef);
  this.loginService.saveOrder(this.cart);
  this.cartService.clearCart();
  this.router.navigate(['home'], {relativeTo: this.route.parent});
}

}
