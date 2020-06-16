import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { IProduct } from './product';

@Injectable({
    providedIn: 'root' 
})
export class ProductService {

    //location of Web Server
    
    private productUrl = 'api/products/products.json';
    //DI for httpclient
    constructor(private httpClient: HttpClient) {console.log('inside constructor ProductService'); }

    getProducts(): Observable<IProduct[]> {
        console.log('inside getProducts');
        return this.httpClient.get<IProduct[]>(this.productUrl)
        .pipe(
            tap(data => console.log('eror '+JSON.stringify(data))),
                catchError(this.handleError)
        );

        
    }
    private handleError(err : HttpErrorResponse){

        // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
    }

    getProduct(id: number): Observable<IProduct | undefined> {
        return this.getProducts()
          .pipe(
            map((products: IProduct[]) => products.find(p => p.productId === id))
          );
      }
}