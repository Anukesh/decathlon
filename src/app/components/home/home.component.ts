import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/common/types/product';
import { CartService } from 'src/app/services/cart-service.service';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements  OnInit{
  public productList: Product[]  = [];
  public filteredProductList: Product[] = [];
  public cart: Product[] = [];

  constructor(private productService: ProductService, private cartService: CartService){}
  ngOnInit(): void {
    // this.cart = this.cartService.getCart();
    this.cartService.getCart()?.subscribe(x=>this.cart=x);

   this.productService.getProducts().subscribe(res=>
  
    {this.productList = res;
      this.productService.categories.subscribe(res1=>{
        if(res1.length)
        this.filteredProductList = this.productList?.filter(e=> res1.includes(e.category));
        else
        this.filteredProductList = this.productList;

        this.filteredProductList = this.filteredProductList.map(t1 => ({...t1, ...this.cart.find(t2 => t2.id === t1.id)}));
      })
    
    });
  }

  updateProductlist(e:any){
    this.filteredProductList = this.filteredProductList?.map(element=>{
      if(e.id==element.id){
        return e;
      }
      else
        return element;
    }
    )
    if(e.quantity == 0){
      this.cartService.removeFromCart(e);
    }
    else{
      this.cartService.updateCart(e);
    }
  }

}
