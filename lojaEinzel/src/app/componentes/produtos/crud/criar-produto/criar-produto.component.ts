import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Produto, VariacaoTamanho } from '../../produto';
import { ProdutoService } from '../../produto.service';

@Component({
  selector: 'app-criar-produto',
  templateUrl: './criar-produto.component.html',
  styleUrls: ['./criar-produto.component.css']
})
export class CriarProdutoComponent {
  
  
  constructor(private http:HttpClient, private produtoService: ProdutoService) { }

  novoProduto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    composicao: '',
    preco: 0,
    categoria: '',
    imagemUrl: [],
    peso: 0,
    altura: 0,
    comprimento: 0,
    largura: 0,
    variacoes: []
  };

  adicionarVariacao() {
    this.novoProduto.variacoes.push({
      tamanho: '',
      estoque: 0,
      cor: '',
      medidas: []
    });
  }

  adicionarMedida(variacao: VariacaoTamanho) {
    variacao.medidas.push({
      regiao: '',
      regTam: 0
    });
  }
  
  criarProduto() {
    this.http.post('https://localhost:5203/produtos', this.novoProduto).subscribe(
      (response) => {  
        alert('Produto criado com sucesso ' + response.toString());
      },
      (error) => {
        // Verifica se o erro é uma instância de HttpErrorResponse
        if (error instanceof HttpErrorResponse) {
          // Acesse as propriedades do objeto error para obter detalhes
          alert('Erro ao criar o produto. Status: ' + error.status + ', Mensagem: ' + error.message);
          console.error('Detalhes do erro:', error);
        } else {
          // Se não for uma instância de HttpErrorResponse, trata o erro de outra forma
          alert('Erro ao criar o produto ' + error.toString());
        }
      }
    );
  }

  enviarImagem() {
    if (!this.novoProduto.id) {
      alert('ID do Produto é obrigatório.');
      return;
    }
  
    const formData = new FormData();
    const imagemInput = document.getElementById('imagemUrl') as HTMLInputElement;
    
    if (imagemInput) {
      const arquivo = imagemInput.files ? imagemInput.files[0] : null;
      
      if (arquivo) {
        formData.append('fotos', arquivo);
  
        this.http.post(`http://localhost:5203/produtos/imagens/` + this.novoProduto.id, formData).subscribe(
          (response) => {
            alert("imagem enviada com sucesso!")
          },
          (error) => {
            alert("ERRO! " + error)
          }
        );
      } else {
        alert('Nenhum arquivo selecionado.');
      }
    } else {
      alert('Elemento de input de imagem não encontrado.');
    }
  }

  excluirProduto() {
    if (!this.novoProduto.id) {
      alert('ID do Produto é obrigatório.');
      return;
    }

    this.http.delete(`http://localhost:5203/produtos/` + this.novoProduto.id).subscribe(
      (response) => {
        alert("PRODUTO DELETADO COM SUCESSO!")
      },
      (error) => {
        alert("ERRO!" + error)
      }
    )
  }


  enviarImagemBanner() {
    const formData = new FormData();
    const imagemInputBanner = document.getElementById('imagemUrlBanner') as HTMLInputElement;
  
    if (imagemInputBanner) {
      const arquivoBanner = imagemInputBanner.files ? imagemInputBanner.files[0] : null;
  
      if (arquivoBanner) {
        formData.append('fotoBanner', arquivoBanner);
  
        
        this.http.post('http://localhost:5203/produtos/banner', formData).subscribe(
          (response) => {
            alert('Imagem do banner enviada com sucesso!');
          },
          (error) => {
            alert('Erro ao enviar imagem do banner: ' + error);
          }
        );
      } else {
        alert('Nenhum arquivo selecionado para o banner.');
      }
    } else {
      alert('Elemento de input de imagem do banner não encontrado.');
    }
  }


}
