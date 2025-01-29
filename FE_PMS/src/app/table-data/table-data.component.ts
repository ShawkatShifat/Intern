import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrl: './table-data.component.css'
})
export class TableDataComponent implements OnInit  {
  usersData : any[] = [];
  page = 1;
  perPage : number = 0;
  totalPages : number = 0; // This should be updated dynamically from the API response
  totalPagesArray: number[] = [];
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.fetchUsers(this.page);
  }

  fetchUsers(page:number): void {
    const apiUrl = 'https://reqres.in/api/users?page='+page;
    this.http.get<any>(apiUrl).subscribe(
      response => {
        // console.log('API response:', response);
        this.usersData = response.data; 
        this.totalPages = response.total_pages;
        this.perPage = response.per_page;
        this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      },
      error => {
        console.error('Error fetching data:', error);
      }
    );
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchUsers(this.page);
    }
  }

  goToPage(page: number) {
    this.page = page;
    this.fetchUsers(this.page);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.fetchUsers(this.page);
    }
  }
}
