import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from "../../service/product.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {switchMap} from "rxjs/operators";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  providers: [ProductService]
})
export class EditProductComponent implements OnInit {
  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.product = new Product();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          let productId = +params.get('id');
          return this.productService.get(productId)
        })
      )
      .subscribe(product => this.product = product);
  }

  update() {
    this.productService.update(this.product).subscribe(
      x => this.router.navigate(['/product'])
    );
  }
}
