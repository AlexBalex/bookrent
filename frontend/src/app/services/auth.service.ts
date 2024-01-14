import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../interfaces/login-dto';
import { RegisterDto } from '../interfaces/register-dto';
import { Observable } from 'rxjs';
import { EmailDto } from '../interfaces/email-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authControllerUrl = 'http://localhost:8080/api/auth';
  private loginUrl = '/login';
  private registerUrl = '/register';

  // Maintain a simple state to check if the user is logged in
  private LoggedIn = false;

  constructor(private http: HttpClient) { }

  // Login method
  login(loginDto: LoginDto): Observable<EmailDto> {
    return this.http.post<EmailDto>(this.authControllerUrl + this.loginUrl, loginDto);
  }

  // Register method
  register(registerDto: RegisterDto): Observable<EmailDto> {
    return this.http.post<EmailDto>(this.authControllerUrl + this.registerUrl, registerDto);
  }

  // isLoggedIn method to check if the user is logged in
  isLoggedIn(): boolean {
    return this.LoggedIn;
  }

  // Logout method
  logout(): void {
    // You can perform any necessary cleanup or additional actions here
    // For simplicity, just update the isLoggedIn state
    this.LoggedIn = false;
  }

  setLoggedIn(LoggedIn: boolean): void {
    this.LoggedIn = LoggedIn;
  }
}
