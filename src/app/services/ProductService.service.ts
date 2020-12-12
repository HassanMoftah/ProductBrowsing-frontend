import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MDProduct } from '../models/MDProduct.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  apiUrl = environment.backend + 'Products/';
  constructor(private http: HttpClient) {}

  add(product: MDProduct) {
    let apiurl = this.apiUrl + 'Add';
    return this.http
      .post<MDProduct>(apiurl, product)
      .pipe(catchError(this.errorhandler));
  }

  update(product: MDProduct) {
    let apiurl = this.apiUrl + 'Update';
    return this.http
      .post<MDProduct>(apiurl, product)
      .pipe(catchError(this.errorhandler));
  }

  getAll() {
    let apiurl = this.apiUrl + 'GetAll';
    return this.http
      .get<MDProduct[]>(apiurl)
      .pipe(catchError(this.errorhandler));
  }
  delete(product: MDProduct) {
    let apiurl = this.apiUrl + 'Delete';
    return this.http
      .post(apiurl, product)
      .pipe(catchError(this.errorhandler));
  }

  uploadImage(id: number, image: any) {
    let apiurl = this.apiUrl + 'UploadImage?id=' + id;
    return this.http
      .post<MDProduct>(apiurl, image)
      .pipe(catchError(this.errorhandler));
  }
  errorhandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
