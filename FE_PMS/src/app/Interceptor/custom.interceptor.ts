import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService) 
  const excludedUrls = ['/registration','/login'];
  // Check if the request URL is in the excluded URLs
  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req); // Skip the interceptor
  }


  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      const clonereq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(clonereq).pipe(
        catchError((error:HttpErrorResponse)=>{
          // console.log('statusCode==>',error.status )
          if(error.status === 401 || error.status === 403){
            localStorage.removeItem(token);
            toastr.error('Please Login Again','Session Expired')
            router.navigateByUrl('/login');
          }
          return throwError(()=>  error);
        })
      );
    }
  }

  // console.log("no token available")
  return next(req);
};
