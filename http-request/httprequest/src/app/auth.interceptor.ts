import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler
  } from '@angular/common/http';
  
  export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
      const modifiedRequest = req.clone({
        headers: req.headers.append('Auth', 'xyz')
       
      });
      console.log("from auth")
      return next.handle(modifiedRequest);
    }
  }
  