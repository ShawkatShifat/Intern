import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrl: './update-project.component.css'
})
export class UpdateProjectComponent implements OnInit {


  constructor(
    private toastr: ToastrService,
    private router:Router,
    private http:HttpClient,
    public dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  id : any;
  name : any;
  intro : any;
  status : any;
  startDateTime : any;
  endDateTime : any;
  owner:any
  baseUrl : string ="http://localhost:8080/api/v1";


  ngOnInit(): void {
    this.id=this.data.project.id;
    this.name=this.data.project.name;
    this.intro=this.data.project.intro;
    if(this.data.project.status==='PRE'){
      this.status=0
    }
    if(this.data.project.status==='START'){
      this.status=1
    }
    if(this.data.project.status==='END'){
      this.status=2
    }

    const startDate = new Date(this.data.project.startDateTime);
    startDate.setDate(startDate.getDate() + 1);
    this.startDateTime = startDate.toISOString().split('T')[0];
  // this.startDateTime = new Date(this.data.project.startDateTime).toISOString().split('T')[0];

  const endDate = new Date(this.data.project.endDateTime);
  endDate.setDate(endDate.getDate() + 1);
  this.endDateTime = endDate.toISOString().split('T')[0];

  // this.endDateTime = new Date(this.data.project.endDateTime).toISOString().split('T')[0];
  this.owner = this.data.project.owner;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    let id = this.id;
    let projectDto ={
      "id":this.id,
      "name":this.name,
      "intro":this.intro,
      "status":this.status,
      "startDateTime": new Date(this.startDateTime),
      "endDateTime": new Date(this.endDateTime),
      "owner":this.owner
    }

    if(id && projectDto){
       this.http.put(this.baseUrl+"/update/project/"+id,projectDto).subscribe((response:any)=>{
        if(response){
          this.toastr.success('Update Successful','Success')
          this.router.navigateByUrl('/layout/dashboard');
          this.onClose();
        }
       },(error)=>{
        console.log("Error While Updating Project Data",error);
       })
    }

  }


  
}
