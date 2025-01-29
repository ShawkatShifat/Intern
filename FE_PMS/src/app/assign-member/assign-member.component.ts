import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.component.html',
  styleUrl: './assign-member.component.css'
})
export class AssignMemberComponent implements OnInit {
  baseUrl : string ="http://localhost:8080/api/v1";
  project: any;
  users: any[] = [];
  dropDownData : any [] = [];
  selectedMembers: any[] = [];;
  assignedMembers: any[] = [];
  dropdownSettings:IDropdownSettings={};
  isButtonDisable : boolean = false;
  checkBoxSelectLimit : number = 5;

  id : number = -1;
  name : string =""
  constructor (private router:Router,private toastr: ToastrService,private route: ActivatedRoute , private http : HttpClient){

  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if(id){
      this.fetchProjectDataId(id);
    }
  }

 fetchProjectDataId(id:string): void {
      this.http.get(this.baseUrl+"/project/"+id).subscribe((response:any)=>{
      if(response){
        this.project = response;
        this.assignedMembers = this.project.members
        this.getUserslist();
        // console.log('data',this.project)
        // console.log('members data',  this.assignedMembers)
        if( this.assignedMembers.length >= 5){
          this.isButtonDisable = true
        }
        this.checkBoxSelectLimit = this.checkBoxSelectLimit-this.assignedMembers.length;
        // console.log("limit", this.checkBoxSelectLimit);
        this.dropdownSettings = {
          idField: 'id',
          textField: 'name',
          allowSearchFilter: true,
          enableCheckAll: false,
          limitSelection: this.checkBoxSelectLimit
        }; 

        
      }
     },(error)=>{
      console.log('Error while getting project data',error);
     });
  }


  getUserslist(){
    this.http.get(this.baseUrl+"/getAllUsers").subscribe((response:any)=>{
     if(response){
      this.users = response
      // console.log("all members", this.users)
      this.dropDownData = this.users.filter(user => 
        !this.assignedMembers.some(assignedMember => assignedMember.username === user.username)
      );
      // console.log('drop down data', this.dropDownData)
     }
    },(error)=>{
      console.log("Error while getting users data", error)
    })
  }

  onItemSelect(item: any) {
    if (this.selectedMembers.length >= 5) {
      this.selectedMembers.pop();
    } else {
      // console.log('Selected Item:', item);
      if (!this.selectedMembers) {
        this.selectedMembers = [];
      }
      this.selectedMembers.push(item);
    }
    if(this.selectedMembers.length === this.checkBoxSelectLimit){
      this.toastr.warning('Max 5 members Allowed','Warning')
    }
  }

  onDeSelect(item: any) {
    // console.log('Deselected Item:', item);
    this.selectedMembers = this.selectedMembers.filter(member => member.id !== item.id);
  }

  assign(){
    let id = this.route.snapshot.paramMap.get('id');
    if(this.selectedMembers && id){
      this.http.post(this.baseUrl+"/add/project/members/"+id,this.selectedMembers).subscribe((response:any)=>{
      if(response.data){
        // this.assignedMembers = response.data.members;
        // console.log("members",this.assignedMembers);
        this.toastr.toastrConfig.preventDuplicates = true;
        this.toastr.success(response.msg,'Member Added')
        this.router.navigateByUrl('/layout/dashboard');
        
      }
      },(error)=>{
        //this.toastr.error('Error While Member Assigning','Error')
        console.log("Error While posting member assign data",error)

      })
    }
  }
}
