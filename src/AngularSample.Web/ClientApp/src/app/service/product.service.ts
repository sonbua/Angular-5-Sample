import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export class Product {
  name: string;
  unitPrice: number;
}

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {
  }

  queryAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://localhost:5001/api/product/products');
  }

  add(product: Product): Observable<any> {
    return this.http.post('https://localhost:5001/api/product/add', product);
  }
}
