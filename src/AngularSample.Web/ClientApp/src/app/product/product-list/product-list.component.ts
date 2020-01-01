import {Component, OnInit} from '@angular/core';
import {Product, ProductService} from '../../service/product.service';
import {Observable, Subject} from "rxjs";
import {debounceTime, switchMap} from "rxjs/operators";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  providers: [ProductService]
})
export class ProductListComponent implements OnInit {
  private keywordSubject: Subject<string>;

  products: Product[];
  keyword: string;
  sortType: string;
  sortReverse: boolean;

  constructor(private productService: ProductService) {
    this.keywordSubject = new Subject<string>();
    this.sortType = '';
    this.sortReverse = true; // set the default sort order
  }

  ngOnInit(): void {
    this.keywordSubject
      .pipe(
        debounceTime(400),
        switchMap(keyword => this.search(keyword))
      )
      .subscribe(products => this.products = products);

    this.onKeywordChanged('');
  }

  delete(productId: number): void {
    this.productService.delete(productId)
      .pipe(switchMap(() => this.search(this.keyword)))
      .subscribe(products => this.products = products);
  }

  onKeywordChanged(text: string) {
    this.keywordSubject.next(text);
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
