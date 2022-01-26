import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNumberSpinnerModule } from 'ngx-number-spinner';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartButtonComponent } from './components/cart-button/cart-button.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FilterPannelComponent } from './components/filter-pannel/filter-pannel.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ModalModule } from 'ngb-modal';

@NgModule({
  declarations: [
    AppComponent,
    CartButtonComponent,
    ProductCardComponent,
    FilterPannelComponent,
    CartComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxNumberSpinnerModule,
    ModalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
