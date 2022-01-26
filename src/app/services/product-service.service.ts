import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/types/product';
import { map } from 'rxjs/operators';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public categories: BehaviorSubject<String[]|any> = new BehaviorSubject([]);

  constructor(private http: HttpClient ) { }
  
  public getProducts(){
    return this.http.get<Product[]>("https://fakestoreapi.com/products").pipe(map( x=> x.map(ele=>{return {...ele, 'quantity':0}; })));
  }

  public getCategories(){
    return this.http.get<Product[]>("https://fakestoreapi.com/products").pipe(map( x=> [...new Set(x.map(i=> i.category))]));
  }

  public updateFilter(e: String[]){
    this.categories.next(e);
  }

}
