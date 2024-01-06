import { Component, OnInit } from '@angular/core';
import { Compra } from '../minhas-compras/Compra';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-compras-controle',
  templateUrl: './compras-controle.component.html',
  styleUrls: ['./compras-controle.component.css']
})
export class ComprasControleComponent implements OnInit {
  compras: Compra[] = []; 
  novoCodigoRastreio: string = '';
  idCompra: number | null = null;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(`https://localhost:7290/user/compras/`)
      .subscribe(
        (data: any) => {
          this.compras = data;
        },
        (error) => {
          console.error('Erro ao obter compras:', error);
        }
      );
  }

  exibirEndereco(endereco: any): string {
    if (endereco) {
      const enderecoFormatado = `${endereco.rua}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}, CEP ${endereco.cep}, ${endereco.complemento}`;
      return enderecoFormatado;
    } else {
      return 'N/A';
    }
  }


  adicionarCodigoRastreio() {
    if (!this.novoCodigoRastreio || !this.idCompra) {
      console.error('Código de rastreio ou ID da compra inválido.');
      return;
    }

    const url = `https://localhost:7290/user/adicionar-codigo-rastreio`;

    const body = {
      compraId: this.idCompra,
      codigoRastreio: this.novoCodigoRastreio
    };

    this.http.post(url, body)
      .subscribe(
        (response: any) => {
          alert('Código de rastreio adicionado com sucesso: ' + response);
          // Atualize a lista de compras após adicionar o código de rastreio
          this.atualizarListaCompras();
          // Limpe o campo do novo código de rastreio
          this.novoCodigoRastreio = '';
        },
        (error) => {
          alert('Erro ao adicionar código de rastreio: ' + error);
        }
      );
  }


  private atualizarListaCompras() {
    // Atualize a lista de compras chamando a API novamente
    this.http.get(`https://localhost:7290/user/compras/`)
      .subscribe(
        (data: any) => {
          this.compras = data;
        },
        (error) => {
          console.error('Erro ao obter compras:', error);
        }
      );
  }

}
