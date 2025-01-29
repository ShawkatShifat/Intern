import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username : string = "";
  password : string = "";
  baseUrl : string ="http://localhost:8080/api/v1";
  constructor(private http:HttpClient, private router : Router,private toastr: ToastrService){
    
  }

  login() {
    if (this.username && this.password) {
      let loginDto = {
        username: this.username,
        password: this.password
      };
  
      this.http.post(this.baseUrl + "/login", loginDto).subscribe(
        (response: any) => {
          if (response && response.message === 'Success') {
            // console.log('resp', response);
            this.toastr.toastrConfig.timeOut = 1000;
            this.toastr.success('Successful Login', 'Login Success');
            localStorage.setItem('token', response.accessToken);
            this.router.navigateByUrl('/layout/dashboard');
          }
        },
        (error: any) => {
          // console.error('Login error:', error);
          this.toastr.error('Invalid Username or Password','Login Fail')
          this.router.navigateByUrl('/login');
        }
      );
    }
    }
    
}
