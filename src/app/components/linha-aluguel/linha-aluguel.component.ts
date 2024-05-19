// aluguel.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-linha-aluguel',
  templateUrl: './linha-aluguel.component.html',
  styleUrls: ['./linha-aluguel.component.css']
})
export class LinhaAluguelComponent {
  constructor(private authService: AuthService, private router: Router) {}

  @Input() id: number=0;
  @Input() nome: string="";
  @Input() tipo: string="";
  @Input() valor: number=0;
  @Input() nomeCliente: string="";
  @Input() cpf: string="";
  @Input() formaPagamento: string="";
  @Input() idImovel: number=0;
  @Input() nomeImovel: string="";

  alterarAluguel(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/aluguel/', this.id]);
    }
  }
}
