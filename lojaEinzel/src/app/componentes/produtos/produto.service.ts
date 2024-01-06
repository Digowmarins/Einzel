import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private readonly API = 'http://localhost:5203/produtos'

  constructor(private http: HttpClient) { }

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.API)
  }

  buscarPorId(id: number): Observable<Produto> {
    const url = `${this.API}/${id}`
    return this.http.get<Produto>(url)
  }

  buscarProdutoImagens(productId: number): Observable<Blob[]> {
    return this.http.get<Blob[]>(`${this.API}/imagens/${productId}`);
  }

  listarBanner(): Observable<any> {
    return this.http.get<Blob[]>(`${this.API}/banners`)
  }
}
