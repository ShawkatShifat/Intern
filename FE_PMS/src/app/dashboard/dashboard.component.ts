import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDetailDialogComponent } from '../project-detail-dialog/project-detail-dialog.component';
import { UpdateProjectComponent } from '../update-project/update-project.component';
import { DeletePeojectComponent } from '../delete-peoject/delete-peoject.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  projectData : any;
  currentUserData : any;
  isProjectOwner : boolean = false;
  isLoading: boolean = true;
  startDateTime : string = "";
  endDateTime : string = "";
  userMap: Map<number, boolean> = new Map();
  baseUrl : string ="http://localhost:8080/api/v1";
  
  
  constructor(private http:HttpClient, private router:Router,public dialog: MatDialog){}
  ngOnInit(): void {
    this.fetchProjectData();
  }

  searchProjects(){
    if(this.startDateTime && this.endDateTime){
      let startDate = new Date (this.startDateTime).toISOString().split('.')[0];
      let endDate = new Date (this.endDateTime).toISOString().split('.')[0];
      const apiUrl = `${this.baseUrl}/project/withinDateRange?StartDateTime=${startDate}&EndDateTime=${endDate}`;
      this.http.get(apiUrl).subscribe((response: any) => {
        this.projectData = response;
        this.isLoading = false;
        this.fetchCurentUserDetails();
      });
    }
  }

  fetchProjectData(): void {

    const now = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startDateTime = this.formatDate(startOfMonth);

    let endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    let endDateTime = this.formatDate(endOfMonth);

    const apiUrl = `${this.baseUrl}/project/withinDateRange?StartDateTime=${startDateTime}&EndDateTime=${endDateTime}`;
    this.http.get(apiUrl).subscribe((response: any) => {
      this.projectData = response;
      this.isLoading = false;
      this.fetchCurentUserDetails();
    });

  }

   formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  fetchCurentUserDetails(): void{
    this.http.get(this.baseUrl+"/loggedInUser").subscribe((response:any)=>{
      if(response){
        this.currentUserData = response;
        if(this.projectData && this.currentUserData){
         for(let project of this.projectData){

          if(project.owner.id === this.currentUserData.data.id){
            this.userMap.set(project.owner.id,true);
          }else{
            this.userMap.set(project.owner.id,false);
          }
         }
      }
      }
    },(error)=>{
      console.log("Error while getting users Data",error);
    })
  
  }

  addMember(id:number){
    if(id){
      this.router.navigateByUrl('/layout/assign-member/'+id);
    }
  }

  openProjectDetail(project: any): void {
    let maxHeightValue : string;
    if(project.members.length>0){
      maxHeightValue = '80vh'
    }else{
      maxHeightValue = '60vh'
    }
    this.dialog.open(ProjectDetailDialogComponent, {
      width :'60vw',
      maxHeight : maxHeightValue,
      data: { project },
      panelClass: 'custom-dialog-container' 
    });
  }

 

  onEditClick(project:any):void {
   this.dialog.open(UpdateProjectComponent,{
    width :'60vw',
    maxHeight: '80vh',
    data:{project},
    panelClass: 'custom-dialog-container' 
   });
  }

  OnDelete(project:any):void{
    this.dialog.open(DeletePeojectComponent,{
      width :'30vw',
      maxHeight: '30vh',
      data:{project},
      panelClass: 'custom-dialog-container' 
     });
  }


}
