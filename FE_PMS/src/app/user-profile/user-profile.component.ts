import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  baseUrl : string ="http://localhost:8080/api/v1";
  // profileForm!: FormGroup;
  userData : any

  constructor(private http:HttpClient,private fb: FormBuilder){
  }

  ngOnInit(): void {
    // this.profileForm = this.fb.group({
    //   name: ['', [Validators.required]],
    //   email: ['', [Validators.required, Validators.email]],
    //   phone: ['', Validators.pattern('^[0-9]*$')],
    //   address: [''],
    // });
    this.fetcHCurrentUserData();
  }

  fetcHCurrentUserData(){
    this.http.get(this.baseUrl+"/loggedInUser").subscribe((response:any)=>{
      if(response.data){
        this.userData = response.data;
      }
    },(error)=>{
      console.log('Error While Getting Current User Data',error)
    })
  }

  // onSubmit(){
  //   if (this.profileForm.valid) {
  //     console.log(this.profileForm.value);
  //     // Make the API call to update the profile
  //   } else {
  //     console.log('Form is invalid');
  //   }
  // }
}
