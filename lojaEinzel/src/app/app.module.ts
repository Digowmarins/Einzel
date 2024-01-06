import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, HammerModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ProdutoComponent } from './componentes/produtos/crud/produto/produto.component';
import { AppRoutingModule } from './app-routing.module';
import { ProdutoCardComponent } from './componentes/produtos/produto-card/produto-card.component';
import { BannerComponent } from './componentes/produtos/banner/banner.component';
import { CriarProdutoComponent } from './componentes/produtos/crud/criar-produto/criar-produto.component';
import { RegistroComponent } from './componentes/usuarios/usuarioService/registro.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { ForgotPasswordComponent } from './componentes/usuarios/forgot-password/forgot-password.component';
import { MinhasComprasComponent } from './componentes/usuarios/minhas-compras/minhas-compras.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ComprasControleComponent } from './componentes/usuarios/compras-controle/compras-controle.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProdutoComponent,
    ProdutoCardComponent,
    BannerComponent,
    CriarProdutoComponent,
    RegistroComponent,
    LoginComponent,
    ForgotPasswordComponent,
    MinhasComprasComponent,
    FooterComponent,
    ComprasControleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HammerModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
