import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mostrarDiv: boolean = false;
  isMenuOpen: boolean = false;
  isMouseOverDivInterna = false;
  isMenuProdutosOpen: boolean = false;
  isUserMenuOpen: boolean = false;
  
  constructor(private router: Router, public authService: AuthService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  mostrarDivInterna() {
    this.isMouseOverDivInterna = true;
    this.mostrarDiv = true;
  }

  ocultarDivInterna() {
    this.isMouseOverDivInterna = false;
    this.mostrarDiv = false;
  }

  toggleMenuOpen() {
    this.isMenuOpen = !this.isMenuOpen;
  
    if (this.isMenuOpen) {
      const menu = document.querySelector('.options_mobile') as HTMLElement;
      menu.style.display = 'block';
    } else {
      setTimeout(() => {
        const menu = document.querySelector('.options_mobile') as HTMLElement;
        menu.style.display = 'none';
      }, 450); // Tempo de espera, ajuste conforme a duração da animação
    }
  }

  toggleMenuProdutos() {
    this.isMenuProdutosOpen = !this.isMenuProdutosOpen;
  
    if (this.isMenuProdutosOpen) {
      const menu = document.querySelector('.produtos') as HTMLElement;
      menu.style.display = 'block';
    } else {
      // Espera um tempo antes de definir o display como 'none'
      setTimeout(() => {
        const menu = document.querySelector('.produtos') as HTMLElement;
        menu.style.display = 'none';
      }, 450); // Tempo de espera, ajuste conforme a duração da animação
    }
  }
  
  navegarParaInicio() {
    this.router.navigate([""])
  }

  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  logout() {
    this.authService.logout()
  }

}
