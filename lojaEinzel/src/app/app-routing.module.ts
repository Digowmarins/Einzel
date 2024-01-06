import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoComponent } from './componentes/produtos/crud/produto/produto.component';
import { ProdutoCardComponent } from './componentes/produtos/produto-card/produto-card.component';
import { CriarProdutoComponent } from './componentes/produtos/crud/criar-produto/criar-produto.component';
import { RegistroComponent } from './componentes/usuarios/usuarioService/registro.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { ForgotPasswordComponent } from './componentes/usuarios/forgot-password/forgot-password.component';
import { MinhasComprasComponent } from './componentes/usuarios/minhas-compras/minhas-compras.component';
import { ComprasControleComponent } from './componentes/usuarios/compras-controle/compras-controle.component';




const routes: Routes = [
  {
    path: '',
    component: ProdutoCardComponent
  },
  {
    path: 'produtos/:id',
    component: ProdutoComponent
  },
  {
    path: 'criarProduto',
    component: CriarProdutoComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "forgot-password",
    component: ForgotPasswordComponent
  },
  {
    path: "minhas-compras",
    component: MinhasComprasComponent
  },
  {
    path: "compras-controle",
    component: ComprasControleComponent
  }

]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
