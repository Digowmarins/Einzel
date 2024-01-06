import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email: string = "";
  showMessage: boolean = false;
  emailValido: boolean = false;
  mensagem: string = "";

  constructor(private usuarioService: UsuarioService) { }

  validarEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  atualizarEstadoEmail() {
    this.emailValido = this.validarEmail(this.email);
  }

  async enviarSolicitacao() {
    this.atualizarEstadoEmail();

    if (this.emailValido) {
      try {
        await this.verificarEmail();
        this.mensagem = "Verifique seu E-mail";
      } catch (error) {
        this.mensagem = "Não existe conta cadastrada com esse e-mail.";
      }
      this.showMessage = true;
    }
  }

  async verificarEmail() {
    try {
      const response: any = await this.usuarioService.verificarEmailExistente(this.email).toPromise();
      console.log(response + this.email);
    } catch (error) {
      console.error(error + this.email.toString());
      throw error;
    }
  }

  fecharMensagem() {
    this.showMessage = false;
  }
}