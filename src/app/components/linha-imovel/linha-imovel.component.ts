import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-linha-imovel',
  templateUrl: './linha-imovel.component.html',
  styleUrls: ['./linha-imovel.component.css']
})
export class LinhaImovelComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @Input() disponivel: boolean = true;
  @Input() id: number = 1;
  @Input() nome: string='Apartamento Itaim';
  @Input() estado: string='teste';
  @Input() endereco: string='teste';
  @Input() numero: string='12';
  @Input() cep: string='teste';
  @Input() tipo: string='Apartamento';
  @Input() valor: number=200.00;

  alterarImovel(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/imovel/', this.id]);
    }
  }
  alugar(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/alugar/', this.id]);
    }
  }
}
