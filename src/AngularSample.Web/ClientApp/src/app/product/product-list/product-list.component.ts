import { Component, OnInit } from '@angular/core';
import { Product, ProductService } from '../../service/product.service';
import { FormControl } from '@angular/forms';
import { Observable } from "rxjs";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  queryControl: FormControl;
  sortType: string;
  sortReverse: boolean;

  constructor(private productService: ProductService) {
    this.queryControl = new FormControl();
    this.sortType = '';
    this.sortReverse = true; // set the default sort order
  }

  ngOnInit(): void {
    this.queryControl.valueChanges
      .debounceTime(400)
      .switchMap(keyword => this.search(keyword))
      .subscribe(products => this.products = products);

    this.queryControl.updateValueAndValidity();
  }

  delete(productId: number): void {
    this.productService.delete(productId)
      .switchMap(() => this.search(this.queryControl.value))
      .subscribe(products => this.products = products);
  }

  search(keyword): Observable<Product[]> {
    return keyword
      ? this.productService.search(keyword)
      : this.productService.queryAllProducts();
  }

  orderProduct(type: string): void {
    if (this.sortType !== type) {
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
