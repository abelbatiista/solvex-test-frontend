import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserInterceptor implements HttpInterceptor {

  public constructor() {}

  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token: string = localStorage.getItem('token') || '';

    const headers = new HttpHeaders({
      'x-token': token
    });

    const requestClone: any = request.clone({
      headers
    });

    return next.handle(requestClone)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    console.warn(`Uf! Something wrong...\n${error.message}`);
    return throwError(error.message);
  }

}
