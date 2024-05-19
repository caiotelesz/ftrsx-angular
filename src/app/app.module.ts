import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { ScrollingModule } from '@angular/cdk/scrolling';
import { LoginComponent } from './components/login/login.component';
import { VitrineComponent } from './vitrine/vitrine.component';
import { HomeComponent } from './components/home/home.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { DisponiveisComponent } from './components/disponiveis/disponiveis.component';
import { AluguelComponent } from './components/aluguel/aluguel.component';
import { AlugadasComponent } from './components/alugadas/alugadas.component';
import { LinhaImovelComponent } from './components/linha-imovel/linha-imovel.component';
import { LinhaAluguelComponent } from './components/linha-aluguel/linha-aluguel.component';
import { NovoImovelComponent } from './components/novo-imovel/novo-imovel.component';
import { TermosComponent } from './components/termos/termos.component';
import { PoliticaComponent } from './components/politica/politica.component';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AlterarimovelComponent } from './components/alterarimovel/alterarimovel.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NovoAluguelComponent } from './components/novo-aluguel/novo-aluguel.component';
import { AlteraraluguelComponent } from './components/alteraraluguel/alteraraluguel.component'

registerLocaleData(localePt);
const maskConfig: Partial<IConfig> = {
  validation: false,
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    VitrineComponent,
    HomeComponent,
    SobreComponent,
    DisponiveisComponent,
    AluguelComponent,
    AlugadasComponent,
    LinhaImovelComponent,
    LinhaAluguelComponent,
    NovoImovelComponent,
    TermosComponent,
    PoliticaComponent,
    AlterarimovelComponent,
    NovoAluguelComponent,
    AlteraraluguelComponent,
  ],
  imports: [
    ScrollingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgxMaskModule.forRoot(maskConfig)
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
