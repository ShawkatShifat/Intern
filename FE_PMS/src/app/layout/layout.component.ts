import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { saveAs } from 'file-saver';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  baseUrl : string ="http://localhost:8080/api/v1";

  constructor(
    private toastr: ToastrService,
    private router:Router,
    private http:HttpClient){}

  downloadReport() {
    const format = 'pdf';
    this.http.get(this.baseUrl + '/project/report/' + format, { responseType: 'blob' }).subscribe((response: Blob) => {
      const fileName = `Project_Report.${format}`;
      saveAs(response, fileName);
    }, (error) => {
      console.log('Error', error);
    });
  }

  logout(){
    this.toastr.warning('You have Logged From The System','Log Out')
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }


  // generateReport(format: string): void {
  //   this.reportServ.generateReport(format).subscribe((data: Blob) => {
     
  //   }, error => {
  //     console.error('Error generating report:', error);
  //   });
  // }


}
