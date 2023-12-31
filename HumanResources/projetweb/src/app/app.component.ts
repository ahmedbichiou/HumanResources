import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projetweb';
  isLoginPage: boolean = false;
  
  constructor(private router: Router) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login';
      }
    });
  }

  logout() {
    // Perform logout logic here (e.g., clear session, navigate to login page)
    // For simplicity, let's navigate to the login page
    this.router.navigateByUrl('/login');
  }
}
