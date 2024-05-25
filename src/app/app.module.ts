import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './View/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './View/footer/footer.component';

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
import { LoginComponent } from './View/login/login.component';
import { HomeComponent } from './View/home/home.component';
import { SobreComponent } from './View/sobre/sobre.component';
import { DisponiveisComponent } from './View/disponiveis/disponiveis.component';
import { AluguelComponent } from './View/aluguel/aluguel.component';
import { AlugadasComponent } from './View/alugadas/alugadas.component';
import { LinhaImovelComponent } from './View/linha-imovel/linha-imovel.component';
import { LinhaAluguelComponent } from './View/linha-aluguel/linha-aluguel.component';
import { NovoImovelComponent } from './View/novo-imovel/novo-imovel.component';
import { TermosComponent } from './View/termos/termos.component';
import { PoliticaComponent } from './View/politica/politica.component';
import { MatDialogModule } from '@angular/material/dialog';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AlterarimovelComponent } from './View/alterarimovel/alterarimovel.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NovoAluguelComponent } from './View/novo-aluguel/novo-aluguel.component';
import { AlteraraluguelComponent } from './View/alteraraluguel/alteraraluguel.component';
import { ConfirmDialogComponent } from './View/confirm-dialog/confirm-dialog.component';
import { CadastroComponent } from './View/cadastro/cadastro.component'
import { ImovelidComponent } from './View/imovelid/imovelid.component';
import { CpfService } from './Controller/cpf.service';

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
    ConfirmDialogComponent,
    CadastroComponent,
    ImovelidComponent
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
    NgxMaskModule.forRoot(maskConfig),
    MatDialogModule,
    MatButtonModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }, CpfService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
