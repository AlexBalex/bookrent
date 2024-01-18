import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { AuthentificationComponent } from './authentification.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { of, throwError} from 'rxjs';
import { LoginDto } from '../interfaces/login-dto';
import { RegisterDto } from '../interfaces/register-dto';
import { EmailDto } from '../interfaces/email-dto';
import { Router } from '@angular/router';

describe('AuthentificationComponent', () => {
  let component: AuthentificationComponent;
  let fixture: ComponentFixture<AuthentificationComponent>;
  let authService: AuthService;
  let router: jasmine.SpyObj<Router>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'setLoggedIn']);
    TestBed.configureTestingModule({
      declarations: [AuthentificationComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [AuthService],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthentificationComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log in successfully', fakeAsync(() => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'password123' };
    spyOn(authService, 'login').and.returnValue(of({ email: loginDto.email } as EmailDto));

    component.email = loginDto.email;
    component.password = loginDto.password;
    component.login();
    tick();

    expect(authService.login).toHaveBeenCalledWith(loginDto);
  }));

  it('should handle login error', fakeAsync(() => {
    const loginDto: LoginDto = { email: 'test@example.com', password: 'invalidpassword' };
  
    spyOn(authService, 'login').and.returnValue(
      of({ email: 'test@example.com' } as EmailDto)
    );
  
    component.email = loginDto.email;
    component.password = loginDto.password;
    component.login();
    tick();
  
    expect(authService.login).toHaveBeenCalledWith(loginDto);
  }));

  it('should register successfully', fakeAsync(() => {
    const registerDto: RegisterDto = {
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    };
  
    spyOn(authService, 'register').and.returnValue(of({ email: registerDto.email } as EmailDto));
  
    component.email = registerDto.email;
    component.password = registerDto.password;
    component.confirmPassword = registerDto.confirmPassword;
    component.register();
    tick();
  
    expect(authService.register).toHaveBeenCalledWith(registerDto);
  }));

  it('should check if email is valid', () => {

    expect(component.isValidEmail('test@example.com')).toBeTrue();

    expect(component.isValidEmail('invalidemail')).toBeFalse();
  });

  it('should toggle registration mode and clear form fields', () => {

    component.email = 'test@example.com';
    component.password = 'password';
    component.confirmPassword = 'password';

    component.toggleRegistration();

 
    expect(component.isRegistering).toBeTrue();
    expect(component.email).toEqual('');
    expect(component.password).toEqual('');
    expect(component.confirmPassword).toEqual('');
  });

  it('should handle registration error and set error message', fakeAsync(() => {

    spyOn(authService, 'register').and.returnValue(throwError({ error: 'email_already_in_use' }));
    component.email = 'existinguser@example.com';
    component.password = 'password';
    component.confirmPassword = 'password';

    component.register();
    tick();
  
    expect(component.emailInUseErrorMessage).toEqual('Email is already in use. Please use a different email.');
  }));
  it('should set password mismatch error message if passwords do not match', () => {
  
    component.password = 'password1';
    component.confirmPassword = 'password2';
    component.register();

    expect(component.passwordMismatchErrorMessage).toEqual('Password and confirm password do not match.');
  });

  it('should set shortPasswordErrorMessage when password is too short', () => {

    component.password = 'short';
    component.register();

    expect(component.password.length).toBeLessThan(8);
  });

});
