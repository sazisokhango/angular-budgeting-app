import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { ToastService } from '@/app/shared/toast.service';
import { AuthStore } from '../store';
import { UserLoginRequest, UserResponseModel } from '../models';

describe('AuthService', () => {
  let store: AuthStore;
  let httpMock: HttpTestingController;

  const toastService = {
    add: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthStore,
        AuthService,
        { provide: ToastService, useValue: toastService },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    store = TestBed.inject(AuthStore);

    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    if (httpMock) {
      httpMock.verify();
    }
  });

  it('should login and update state correctly', () => {
    const mockRequest: UserLoginRequest = { email: 'test@mailinator.com', password: '1234' };

    const mockResponse: UserResponseModel = {
      id: '1',
      name: 'test',
      email: 'test@mailinator.com',
      avatar: 'avatar.png',
      token: 'dummy-token',
    };

    let result: UserResponseModel = {
      id: '',
      name: '',
      email: '',
      avatar: '',
      token: '',
    };
    store.login(mockRequest).subscribe((res) => (result = res));

    const req = httpMock.expectOne('http://localhost:8080/api/auth/login');
    expect(req.request.method).toBe('POST');

    req.flush(mockResponse);

    expect(result).toEqual(mockResponse);

    expect(localStorage.getItem('token')).toBe(mockResponse.token);
    expect(store.token()).toBe(mockResponse.token);
    expect(store.user().email).toBe(mockResponse.email);
    expect(store.isAuthenticated()).toBe(true);
  });

  it('should logout', () => {
    // localStorage.removeItem('token');

    store.logout();

    expect(store.token()).toBeNull();
    expect(localStorage.getItem('token')).toBeNull();
    expect(toastService.add).toBeCalledWith('Logged out successfully', 'success', 2000);
  });

  it('should register a user', () => {
    const formData = new FormData();
    formData.append('name', 'test');
    formData.append('email', 'test@mailinator.com');
    formData.append('password', 'password');
    formData.append('avatar', 'avatar.png');

    store.createNewUser(formData).subscribe();

    const req = httpMock.expectOne('http://localhost:8080/api/auth/register');
    expect(req.request.method).toBe('POST');

    req.flush({} as any);
  });
});
