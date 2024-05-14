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

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
