// app.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './View/login/login.component';
import { HomeComponent } from './View/home/home.component';
import { AuthGuard } from './Model/services/auth-guard.guard';
import { AlugadasComponent } from './View/alugadas/alugadas.component';
import { DisponiveisComponent } from './View/disponiveis/disponiveis.component';
import { AluguelComponent } from './View/aluguel/aluguel.component';
import { SobreComponent } from './View/sobre/sobre.component';
import { NovoImovelComponent } from './View/novo-imovel/novo-imovel.component';
import { PoliticaComponent } from './View/politica/politica.component';
import { TermosComponent } from './View/termos/termos.component';
import { AlterarimovelComponent } from './View/alterarimovel/alterarimovel.component';
import { NovoAluguelComponent } from './View/novo-aluguel/novo-aluguel.component';
import { AlteraraluguelComponent } from './View/alteraraluguel/alteraraluguel.component';
import { CadastroComponent } from './View/cadastro/cadastro.component';
import { ImovelidComponent } from './View/imovelid/imovelid.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroComponent
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
  },
  {
    path: 'verimovel/:id',
    component: ImovelidComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
