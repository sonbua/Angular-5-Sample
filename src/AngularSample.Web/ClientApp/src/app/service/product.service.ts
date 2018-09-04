import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
    return this.http.get<Product[]>('http://localhost:3000/products');
  }

  add(product: Product): Observable<any> {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/products', product, {headers: headers});
  }
}
