import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Produto} from '../../produto';
import { ProdutoService } from '../../produto.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { DadosFrete } from '../../dadosFrete';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit{

  parcelas: number = 3;
  freteCalculado: any;
  imagemIndex: number = 0;
  dadosFrete: DadosFrete | any
  cepDest: string | undefined;
  mostrarFreteCalculado: boolean = false;
  mostrarDescricao: boolean = false;
  mostrarComposicao: boolean = false;
  produtosRelacionados: Produto[] = [];
  mostrarProdutosIndex: number = 0;
  swipeLeft: boolean = false;
  swipeRight: boolean = false;
  mostrarSegundaImagem: boolean[] = [];


  @Input() produto: Produto = {
    id: 0,
    nome: "",
    descricao: "",
    composicao: "",
    preco: 0,
    categoria: "",
    peso: 0,
    altura: 0,
    comprimento: 0,
    largura: 0,
    imagemUrl: [],
    variacoes: []
  }

  constructor(private produtoService: ProdutoService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const idDoProduto = +params['id'];

      if (!isNaN(idDoProduto) && idDoProduto > 0) {
        this.produtoService.buscarPorId(idDoProduto).subscribe((produto) => {
          this.produto = produto;

          
          this.carregarImagensProduto(this.produto);

          
          this.carregarProdutosRelacionados(idDoProduto);
        });
      }
    });
  }

  carregarImagensProduto(produto: Produto): void {
    this.produtoService.buscarProdutoImagens(produto.id).subscribe(imagens => {
      const urls: string[] = [];
      for (const imagemBase64 of imagens) {
        const url = `data:image/jpeg;base64,${imagemBase64}`;
        urls.push(url);
      }
      produto.imagemUrl = urls;
    });
  }

  carregarProdutosRelacionados(productId: number): void {
    this.produtoService.listar().subscribe(produtos => {
      // Remova o produto atual da lista (opcional)
      this.produtosRelacionados = produtos.filter(p => p.id !== this.produto.id);
  
      // Inicialize o array mostrarSegundaImagem com valores falsos para cada produto relacionado
      this.mostrarSegundaImagem = Array(this.produtosRelacionados.length).fill(false);
  
      // Carregar imagens dos produtos relacionados
      this.produtosRelacionados.forEach((p, index) => {
        this.carregarImagensProduto(p);
        this.mostrarSegundaImagem[index] = false; // Inicializar com false
      });
    });
  }

  alternarSegundaImagem(index: number): void {
    const produto = this.produtosRelacionados[index];

    if (produto.imagemUrl && produto.imagemUrl.length > 1) {
      setTimeout(() => {
        this.mostrarSegundaImagem[index] = !this.mostrarSegundaImagem[index];
      }, 150);
    }
  }

  resetarSegundaImagem(index: number): void {
    this.mostrarSegundaImagem[index] = false;
  }

  

  nextImage() {
    if (this.produto && this.produto.imagemUrl && this.imagemIndex < this.produto.imagemUrl.length - 1) {
      this.swipeRight = false;
      console.log(this.imagemIndex);
      setTimeout(() => {
        this.swipeLeft = true;
        this.imagemIndex++;
      }, 300); 
      this.swipeLeft = false;
    }
  }

  prevImage() {
    if (this.imagemIndex > 0 ) {
      this.swipeLeft = false;
      setTimeout(() => { 
        this.imagemIndex--  
        this.swipeRight = true;
      }, 300)
      this.swipeRight = false
      console.log(this.imagemIndex)
    }
  }

  calcularFrete() {
    if (this.produto != null) {
      const url = `https://www.cepcerto.com/ws/json-frete/28605000/${this.cepDest}/${this.produto.peso}/${this.produto.comprimento}/${this.produto.largura}/${this.produto.altura}`;
      console.log(this.produto.peso)
      console.log(this.produto.altura)
      console.log(this.produto.comprimento)
      console.log(this.produto.largura)
        this.http.get(url).subscribe(dadosFrete => {
          console.log(this.cepDest)
          this.mostrarFreteCalculado = true;
          this.dadosFrete = dadosFrete;
          this.cepDest = ""
        });  
    }
  }

  toggleDescricao() {
    this.mostrarDescricao = !this.mostrarDescricao;
  }

  toggleComposicao() {
    this.mostrarComposicao = !this.mostrarComposicao
  }

  nextProdutosRelacionados() {
    if (this.produtosRelacionados.length >= 5) {
      const itemsToShow = this.produtosRelacionados.length - 3;
      this.mostrarProdutosIndex = (this.mostrarProdutosIndex + 1) % itemsToShow;
      console.log('Next Index:', this.mostrarProdutosIndex);
    }
  }
  
  prevProdutosRelacionados() {
    if(this.produtosRelacionados.length >= 5) {
      const itemsToShow = this.produtosRelacionados.length - 3; 
      this.mostrarProdutosIndex = (this.mostrarProdutosIndex - 1 + itemsToShow) % itemsToShow;
      console.log('Prev Index:', this.mostrarProdutosIndex);
    }
  }

  nextProdutosRelacionadosMobile() {
    if (this.produtosRelacionados.length >= 5) {
      const itemsToShow = this.produtosRelacionados.length - 1;
      this.mostrarProdutosIndex = (this.mostrarProdutosIndex + 1) % itemsToShow;
      console.log('Next Index:', this.mostrarProdutosIndex);
    }
  }
  
  prevProdutosRelacionadosMobile() {
    if(this.produtosRelacionados.length >= 5) {
      const itemsToShow = this.produtosRelacionados.length - 1; 
      this.mostrarProdutosIndex = (this.mostrarProdutosIndex - 1 + itemsToShow) % itemsToShow;
      console.log('Prev Index:', this.mostrarProdutosIndex);
    }
  }

}
