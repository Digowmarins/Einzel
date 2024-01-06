import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { Route, Router } from '@angular/router';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registroForm: FormGroup;
  senhaVisivel = false;
  confirmarSenhaVisivel = false;
  mensagem: string = '';
  operacaoBemSucedida: boolean | null = null;

  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router: Router) {
    this.registroForm = this.formBuilder.group({
      nomeCompleto: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.pattern(/^(\([1-9]{2}\))?[2-9][0-9]{7}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: this.compararSenhas
    });
  }

  submitRegistro() {
    if (this.registroForm.valid) {
      const novoCliente: User = {
        NomeCompleto: this.registroForm.get('nomeCompleto')!.value,
        email: this.registroForm.get('email')!.value,
        password: this.registroForm.get('senha')!.value,
        confirmPassword: this.registroForm.get('confirmarSenha')!.value,
      };

      this.http.post('https://localhost:7290/user/', novoCliente, { responseType: 'text' })
        .subscribe(
          (response) => {
            this.operacaoBemSucedida = true;

            // Exibe mensagem de sucesso
            this.mensagem = 'Cadastro realizado com sucesso!';
          },
          (error) => {
            this.operacaoBemSucedida = false;

            // Exibe mensagem de erro
            this.mensagem = 'Erro ao cadastrar novo cliente. Verifique os dados e tente novamente.';
          }
        );
    }
  }
  

  compararSenhas(group: AbstractControl) {
    const senhaControl = group.get('senha');
    const confirmarSenhaControl = group.get('confirmarSenha');
  
    if (senhaControl && confirmarSenhaControl) {
      const senha = senhaControl.value;
      const confirmarSenha = confirmarSenhaControl.value;
  
      if (senha === confirmarSenha) {
        return null;
      }
    }
  
    return { senhasNaoCoincidem: true };
  }

  toggleSenhaVisibility(field: string) {
    if (field === 'senha') {
      this.senhaVisivel = !this.senhaVisivel;
    } else if (field === 'confirmarSenha') {
      this.confirmarSenhaVisivel = !this.confirmarSenhaVisivel;
    }
  }

  aplicarMascaraTelefone(event: any) {
    const input = event.target;
    const value = input.value.replace(/\D/g, '');
    let formattedValue = '';

    if (value.length <= 11) {
      if (value.length <= 10) {
        formattedValue = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
      } else {
        formattedValue = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    } else {
      formattedValue = value.substring(0, 11).replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }

    input.value = formattedValue;
  }

  fecharMensagem() {
    if (this.operacaoBemSucedida == true) {
      this.router.navigate(['/login']);
    }
    this.mensagem = '';
    this.operacaoBemSucedida = null;
  }
}
