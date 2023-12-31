import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  Employee: any = [];
  username: string = '';
  password: string = '';
  error: boolean = false;

  constructor(private apiService: ApiService ,private router: Router) { 
    
    this.readEmployee();
    
  }

  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  }

  loginUser() {
    const userExists = this.Employee.some((employee) => {
      return (
        employee.designation === 'HR' ||
        employee.designation === 'Admin'
      ) && employee.name === this.username && employee.password === this.password;
    });

    if (userExists) {
      // User is HR or Admin, perform login logic here
      console.log('Login successful');
      this.router.navigate(['/employees-list']);
      this.error = false;
    } else {
      // User does not exist or is not HR/Admin
      console.log('Login failed');
      this.error = true;
    }
  }
}

