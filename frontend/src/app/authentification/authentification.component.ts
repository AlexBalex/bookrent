import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../interfaces/login-dto';

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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const paramMap = this.route.snapshot.queryParamMap;
    this.isRegistering = paramMap.get('action') === 'register';
  }

  login(): void {
    const loginDto: LoginDto = { email: this.email, password: this.password };

    this.authService.login(loginDto).subscribe({
      next: (response: any) => {
        console.log(response);
        this.authService.setLoggedIn(true);
        this.navigateToHome();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }


  register(): void {
    const registerDto = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    // Adjust the API endpoint according to your backend structure
    this.http.post('/api/auth/register', registerDto).subscribe(
      (response: any) => {
        // Handle successful registration response
        console.log(response);
        // Redirect to home or perform other actions
      },
      (error) => {
        // Handle registration error
        console.error(error);
      }
    );
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
