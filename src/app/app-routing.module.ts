// app.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/auth-guard.guard';
import { AlugadasComponent } from './components/alugadas/alugadas.component';
import { DisponiveisComponent } from './components/disponiveis/disponiveis.component';
import { AluguelComponent } from './components/aluguel/aluguel.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { NovoImovelComponent } from './components/novo-imovel/novo-imovel.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { TermosComponent } from './components/termos/termos.component';
import { AlterarimovelComponent } from './components/alterarimovel/alterarimovel.component';
import { NovoAluguelComponent } from './components/novo-aluguel/novo-aluguel.component';
import { AlteraraluguelComponent } from './components/alteraraluguel/alteraraluguel.component';
import { CadastroComponent } from './components/cadastro/cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alugados',
    component: AlugadasComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'disponiveis',
    component: DisponiveisComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aluguel',
    component: AluguelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'sobre',
    component: SobreComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastroimovel',
    component: NovoImovelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'imovel/:id',
    component: AlterarimovelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alugar/:id',
    component: NovoAluguelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'aluguel/:id',
    component: AlteraraluguelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'politica',
    component: PoliticaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'termosecondicoes',
    component: TermosComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
