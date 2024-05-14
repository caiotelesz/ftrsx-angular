// aluguel.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-linha-aluguel',
  templateUrl: './linha-aluguel.component.html',
  styleUrls: ['./linha-aluguel.component.css']
})
export class LinhaAluguelComponent {
  @Input() nome: string="";
  @Input() tipo: string="";
  @Input() valor: number=20;
  @Input() nomeCliente: string="";
  @Input() cpf: string="";
  @Input() formaPagamento: string="";
  @Input() idImovelAlugado: number=1;
}
