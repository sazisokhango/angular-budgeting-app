import { environment } from '@/environments/environment.development';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLoginRequest, UserRequestModel, UserResponseModel } from '../models';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}/auth`;
  private readonly registerUrl = this.baseUrl + '/register';
  private readonly loginUrl = this.baseUrl + '/login';

  private readonly httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }

  public registerUser(userRequest: Readonly<FormData>): Observable<UserResponseModel> {
    return this.httpClient.post<UserResponseModel>(this.registerUrl, userRequest);
  }

  public userLogin(loginRequest: UserLoginRequest): Observable<UserResponseModel> {
    return this.httpClient.post<UserResponseModel>(this.loginUrl, loginRequest);
  }
}
