import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../interfaces/login-dto';
import { RegisterDto } from '../interfaces/register-dto';

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
  errorMessage: string = ''; 
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
    if (this.password !== this.confirmPassword) {
      this.errorMessage = "Password and confirm password do not match.";
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }

    if (!this.isValidEmail(this.email)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }

    const registerDto: RegisterDto = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };
  
    this.authService.register(registerDto).subscribe({
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

  toggleRegistration(): void {
    this.isRegistering = !this.isRegistering;
    this.clearFormFields();
  }

  clearFormFields(): void {
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  navigateToHome(): void {
    this.router.navigate(['/']);
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
