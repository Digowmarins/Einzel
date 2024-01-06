import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = ""
  password: string = ""
  senhaVisivel: boolean = false;
  loginError: string = "";

  constructor(private authService: AuthService, private router: Router, private cdr: ChangeDetectorRef) { }

  login() {
    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe(
      (response: any) => {
        console.log('Login bem-sucedido. Token:', response.token);
        this.authService.setToken(response.token)
        
        this.router.navigate(['/']);

        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro no login:', error);
        this.loginError = 'Credenciais inválidas.';
      }
    );
  }

  toggleSenhaVisibility() {
      this.senhaVisivel = !this.senhaVisivel;
  }

}
