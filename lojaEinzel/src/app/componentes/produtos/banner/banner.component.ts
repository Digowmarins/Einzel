import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banners: any[] = [];
  currentSlideIndex = 0;

  constructor(private produtoService: ProdutoService) { }

  ngOnInit(): void {
    this.carregarBanners();
  }

  carregarBanners() {
    this.produtoService.listarBanner().subscribe(
      (banners: any[]) => {
        // Supondo que o backend retorna dados Base64
        this.banners = banners.map(banner => `data:image/jpeg;base64, ${banner}`);
        this.iniciarCarrossel();
      },
      error => {
        console.error('Erro ao carregar banners', error);
      }
    );
  }

  iniciarCarrossel() {
    setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.banners.length;
      document.documentElement.style.setProperty('--currentIndex', this.currentSlideIndex.toString());
      console.log('Novo índice do slide:', this.currentSlideIndex);
    }, 5000);
  }
}