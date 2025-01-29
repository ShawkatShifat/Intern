import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name : string = "";
  email : string = "";
  mobileNo : string = "";
  gender : string = "";
  username : string = "";
  password : string = "";

  baseUrl : string ="http://localhost:8080/api/v1";
 

  constructor(
    private toastr: ToastrService,
    private http:HttpClient , 
    private router: Router ){

  }


  register(){
      let userDto = {
        "name":this.name,
        "email":this.email,
        "mobileNo":this.mobileNo,
        "gender":this.gender,
        "username":this.username,
        "password":this.password
      }
      this.http.post(this.baseUrl+"/registration",userDto).subscribe((response:any)=>{
        if(response.data){
          this.toastr.success(response.msg,'Success')
          this.router.navigateByUrl('/login');
        }else{
          this.toastr.error(response.msg,'Error')
        }
      });      
    }
  
    
}
