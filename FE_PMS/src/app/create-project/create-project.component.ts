import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

  constructor(private toastr: ToastrService,private http:HttpClient, private router : Router){}

  baseUrl : string ="http://localhost:8080/api/v1";

  name : string = "";
  intro : string = "";
  status : number = -1;
  startDateTime : string = "";
  endDateTime : string = "";
 
  createProject(){
    let projectDto = {
      "name":this.name,
      "intro":this.intro,
      "status":this.status,
      "startDateTime":new Date(this.startDateTime),
      "endDateTime": new Date(this.endDateTime),
    }

    this.http.post(this.baseUrl + "/create/project", projectDto).subscribe(
      (response: any) => {
        if (response) {
          this.toastr.success('Project Created Successfully','Success')
          this.router.navigate(['/layout/dashboard']);
        }
      },
      error => {
        console.error('Error creating project:', error);
        this.toastr.error('Failed to create project. Please try again.','Error')
      }
    );
  }
}
