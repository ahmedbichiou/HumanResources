import { Component, ElementRef, Renderer2 } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  Employee: any = [];
  username: string = '';
  password: string = '';
  error: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private renderer: Renderer2, private el: ElementRef) {
    this.readEmployee();
  }

  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  }

  toggleSignIn() {
    const container = this.el.nativeElement.querySelector(".container");
    this.renderer.addClass(container, 'sign-up-mode');
  }
  toggleLogout() {
    const container = this.el.nativeElement.querySelector(".container");
    this.renderer.removeClass(container, 'sign-up-mode');
    this.username = '';
    this.password = '';
  }
  
  loginUser() {
    const userExists = this.Employee.some((employee) => {
      return (
        (employee.designation === 'HR' || employee.designation === 'Admin') &&
        employee.name === this.username &&
        employee.password === this.password
      );
    });

    if (userExists) {
      console.log('Login successful');
      this.error = false;
      this.toggleSignIn(); // Trigger the transition only when the login is successful
    } else {
      console.log('Login failed');
      this.error = true;
    }
  }
  Enter(){
    this.router.navigate(['/employees-list']);
  }
}
