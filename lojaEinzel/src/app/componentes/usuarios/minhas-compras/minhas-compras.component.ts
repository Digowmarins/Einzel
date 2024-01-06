import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Compra } from './Compra';


@Component({
  selector: 'app-minhas-compras',
  templateUrl: './minhas-compras.component.html',
  styleUrls: ['./minhas-compras.component.css']
})
export class MinhasComprasComponent implements OnInit {
  minhasCompras: Compra[] = [];

  constructor(public authService: AuthService, private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(`https://localhost:7290/user/compras/${this.authService.getUserId()}`)
      .subscribe(
        (data: any) => {
          this.minhasCompras = data; // Assumindo que a resposta é um array de compras
          console.log('Compras:', this.minhasCompras);
        },
        (error) => {
          console.error('Erro ao obter compras:', error);
        }
      );
  }

}
