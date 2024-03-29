import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://localhost:7290/authentication/VerificarEmail';


  constructor(private http: HttpClient) { }

  verificarEmailExistente(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${email}`, null);
  }

  getCompras(id: string) {
    return this.http.get(`${this.apiUrl}/user/${id}`)
  }
}
