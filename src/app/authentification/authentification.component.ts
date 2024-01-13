// authentification.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css'],
})
export class AuthentificationComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  isRegistering: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    const paramMap = this.route.snapshot.queryParamMap;
    this.isRegistering = paramMap.get('action') === 'register';
  }
  login(): void {
    // Add your login logic here
  }

  register(): void {
    // Add your registration logic here
  }

  toggleRegistration(): void {
    this.isRegistering = !this.isRegistering;
    // Clear form fields when switching between login and registration
    this.clearFormFields();
  }

  clearFormFields(): void {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  navigateToHome(): void {
    this.router.navigate(['/']); // Navigate to the home page
  }
}
