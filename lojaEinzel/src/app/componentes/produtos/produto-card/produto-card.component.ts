import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-produto-card',
  templateUrl: './produto-card.component.html',
  styleUrls: ['./produto-card.component.css']
})
export class ProdutoCardComponent implements OnInit {

  produtoLista: Produto[] = [];
  mostrarSegundaImagem: boolean[] = [];
  coresExibidas = new Set<string>(); 

  constructor(private produtoService: ProdutoService, private router: Router,) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe(produtos => {
      this.produtoLista = produtos;
      // Inicializar o array mostrarSegundaImagem com valores falsos para cada card
      this.mostrarSegundaImagem = Array(this.produtoLista.length).fill(false);
      this.carregarImagens();
      console.log(this.produtoLista[0].imagemUrl)
    });
  }


  carregarImagens(): void {
    this.produtoLista.forEach((produto, index) => {
      this.produtoService.buscarProdutoImagens(produto.id).subscribe(imagens => {
        const urls: string[] = [];
        for (const imagemBase64 of imagens) {
          const url = `data:image/jpeg;base64,${imagemBase64}`;
          urls.push(url);
        }
        this.produtoLista[index].imagemUrl = urls;
      });
    });
  }

  navegarParaProduto(produtoId: number): void {
    this.router.navigate(['/produtos/', produtoId]);
  }

  alternarSegundaImagem(index: number) {
    const produto = this.produtoLista[index];
  
    if (produto.imagemUrl && produto.imagemUrl.length > 1) {
      setTimeout(() => {
        this.mostrarSegundaImagem[index] = !this.mostrarSegundaImagem[index];
      }, 150);
    }
  }

  resetarSegundaImagem(index: number) {
    this.mostrarSegundaImagem[index] = false;
  }

}
