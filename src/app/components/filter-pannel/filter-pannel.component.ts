import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-filter-pannel',
  templateUrl: './filter-pannel.component.html',
  styleUrls: ['./filter-pannel.component.scss']
})
export class FilterPannelComponent implements OnInit {

  public isCollapsed = false;
  public categories: String[] | undefined;;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  this.productService.getCategories().subscribe(x =>  this.categories = x);
  }

  toggleCollapse(){
    this.isCollapsed = !this.isCollapsed;
  }

  filterCategoris(){
    const checkboxes = document.querySelectorAll('.form-check-input');
    const selectedboxes = Array.prototype.slice.call(checkboxes).filter(ch => ch.checked==true).map(x=>x.id);
    this.productService.updateFilter(selectedboxes);
  }

}
