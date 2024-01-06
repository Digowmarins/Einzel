import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7290/authentication/login';
  private authToken: string | null = null;
  private userName: string | null = null;
  private userId: string | null = null;

  constructor(private http: HttpClient) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}`, credentials);
  }

  setToken(token: string, expiresIn: number | null = null): void {
    // Se o token contiver informações do usuário, extraia o nome
    const decodedToken = this.decodeToken(token);
    const userName = decodedToken ? decodedToken.name : null;
    const nameId = decodedToken ? decodedToken.nameid : null;
  
    // Armazenar o token e o nome do usuário no serviço de autenticação
    this.authToken = token;
    this.userName = userName;
    this.userId = nameId;
    
  
    // Armazenar o token e o nome do usuário no cookie
    if (expiresIn !== null) {
      const expirationDate = new Date(Date.now() + expiresIn * 1000);
      const cookieOptions = `expires=${expirationDate.toUTCString()};path=/;Secure`;
  
      document.cookie = `authToken=${token};${cookieOptions}`;
      document.cookie = `userName=${userName};${cookieOptions}`;
      document.cookie = `userId=${nameId};${cookieOptions}`;
      document.cookie = `expirationDate=${expirationDate.toUTCString()};${cookieOptions}`;
    } else {
      document.cookie = `authToken=${token};path=/;Secure`;
      document.cookie = `userName=${userName};path=/;Secure`;
      document.cookie = `userId=${nameId};path=/;Secure`;
    }
  }

  decodeToken(token: string ): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(base64));
  }

  getToken(): string | null {
    return this.authToken || (document.cookie.match(/authToken=([^;]+)/) || [])[1] || null;
  }

  getUserId(): string | null {
    return this.userId || this.getCookieValue('userId') || null;
  }

  getUserName(): string | null {
    return this.userName || this.getCookieValue('userName') || null;
  }

  logout(): void {
    this.authToken = null;
    this.userName = null;

    this.removeCookie('authToken');
    this.removeCookie('expirationDate');
    this.removeCookie('userName');
  }

  private getCookieValue(name: string): string | null {
    const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
    return match ? match[1] : null;
  }

  private removeCookie(name: string): void {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;Secure`;
  }

  isAuthenticated(): boolean {
    const authToken = this.getCookieValue('authToken');
    return !!authToken;
  }
  
}