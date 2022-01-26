import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { Product } from '../common/types/product';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private user: String | null | undefined = null;
  public loggedInUser : ReplaySubject<String | null> | undefined = new ReplaySubject(1);
  public orderLocal: Product[][] = []; 
  public order: Subject<Product[][]> = new Subject();

  public login(user: String){
    this.user = user;
    this.loggedInUser?.next(this.user);
  }

  public saveOrder(o: Product[]){
    this.orderLocal?.push(o);
    this.order.next(this.orderLocal);
    console.log(this.order);
  }

  public logOff(){
    this.orderLocal = [];
    this.user = null;
    this.loggedInUser?.next(this.user);
    this.order.next(this.orderLocal);
  }

  constructor() { }
}
