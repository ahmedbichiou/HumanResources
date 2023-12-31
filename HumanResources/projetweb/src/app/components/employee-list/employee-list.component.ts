import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../service/api.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  
  Employee:any = [];
  searchInput: string = '';
  employees: any[] = [];
  constructor(private apiService: ApiService) { 
    this.readEmployee();
  }
  ngOnInit() {}
  readEmployee(){
    this.apiService.getEmployees().subscribe((data) => {
     this.Employee = data;
    })    
  }
  removeEmployee(employee, index) {
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
          this.Employee.splice(index, 1);
        }
      )    
    }
  }
  onSearchChange(searchValue: string): void {
    this.searchInput = searchValue;
    if (searchValue.length > 2) { // Only search if the input length is greater than 2
      this.apiService.searchEmployees(searchValue).subscribe(
        (data: any[]) => {
          this.Employee = data;
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (searchValue.length === 0) { // If the search input is empty, fetch all employees
      this.readEmployee();
    }
  }

}