import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../../service/product.service';
import {FormControl} from '@angular/forms';
import {debounceTime} from "rxjs/operators";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  queryControl: FormControl;

  constructor(private productService: ProductService) {
    this.queryControl = new FormControl();
  }

  ngOnInit(): void {
    this.loadAllProducts();
    this.queryControl.valueChanges
      .pipe(debounceTime(400))
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

  searchProduct(keyword : string): void {
    if(!keyword){
      this.loadAllProducts();
      return;
    }
    this.productService.search(keyword).subscribe(products => {
      this.products = products;
    });
  };
}
