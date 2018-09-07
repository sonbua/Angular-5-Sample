import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../../service/product.service';
import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  queryControl: FormControl;
  sortType: string;
  sortReverse : boolean;

  constructor(private productService: ProductService) {
    this.queryControl = new FormControl();
    this.sortType = '';
    this.sortReverse = true; // set the default sort order
  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.queryControl.valueChanges
      .debounceTime(400)
      .subscribe(keyword => this.searchProduct(keyword));
  }

  loadAllProducts() {
    this.productService.queryAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  delete(productId: number): void {
    this.productService.delete(productId).subscribe(
      x => this.loadAllProducts()
    );
  }

  searchProduct(keyword: string): void {
    if (!keyword) {
      this.loadAllProducts();
      return;
    }
    this.productService.search(keyword).subscribe(products => {
      this.products = products;
    });
  };

  orderProduct(type: string): void {
    if(this.sortType !== type){
      this.sortReverse = true;
    }
    this.sortType = type;
    this.productService.orderBy(this.sortType, this.sortReverse ? 'asc' : 'desc').subscribe(
      products => {
        this.products = products;
        this.sortReverse = !this.sortReverse;
      }
    );
  };
}
