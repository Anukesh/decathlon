import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { Product } from '../common/types/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cart: ReplaySubject<Product[]> | undefined = new ReplaySubject(1);
  private cartLocal: Product[] = [];
  public cartTotal: ReplaySubject<{quantity: number, price: number}> = new ReplaySubject(1);

  constructor() { }

  public getTotal(){
    let total = {quantity: 0, price: 0};
    this.cartLocal.forEach(e=>{
      total.quantity += e.quantity;
      total.price += e.quantity*e.price;
    });
    this.cartTotal.next(total);
    return this.cartTotal;
  }

  public getCart(){
    return this.cart;
  }

  public updateCart(e: Product){
    if(this.cartLocal.findIndex(x=>x.id==e.id)>=0)
    {
    this.cartLocal = this.cartLocal?.map(element=>{
      if(e.id==element.id){
        return e;
      }
      else
        return element;
    }
    );
  }
  else{
    this.cartLocal.push(e);
  }
  this.cart?.next(this.cartLocal);
   this.getTotal();
  }

  public removeFromCart(e: Product){
    this.cartLocal.splice(this.cartLocal.findIndex(x=>x.id==e.id),1);
    this.cart?.next(this.cartLocal);
    this.getTotal();
  }

  public clearCart(){
    this.cartLocal = [];
    this.cart?.next(this.cartLocal);
    this.getTotal();
  }
}
