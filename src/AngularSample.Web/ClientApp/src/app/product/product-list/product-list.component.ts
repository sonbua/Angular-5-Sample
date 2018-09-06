import {Component, OnInit} from "@angular/core";
import {Product, ProductService} from "../../service/product.service";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  products: Product[];
  query: string;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.loadAllProducts();
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

  search(query: string): void {
    if(!query){
      this.loadAllProducts();
      return;
    }

    this.productService.filterByName(query).subscribe(
      x => this.products = x
    )
  }
}
