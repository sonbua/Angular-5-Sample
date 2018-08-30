import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {Router} from "@angular/router";

@Component({
  selector: 'add-product',
  templateUrl: './add-product.component.html',
  providers: [ProductService]
})
export class AddProductComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.product = new Product();
  }

  addNewProduct() {
    this.productService.add(this.product)
      .subscribe(obj => {
        this.router.navigate(['/product'])
      });
  }
}
