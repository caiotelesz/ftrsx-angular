import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-linha-imovel',
  templateUrl: './linha-imovel.component.html',
  styleUrls: ['./linha-imovel.component.css']
})
export class LinhaImovelComponent {
  @Input() disponivel: boolean = true;
  @Input() id: number = 1;
  @Input() nome: string='Apartamento Itaim';
  @Input() estado: string='teste';
  @Input() endereco: string='teste';
  @Input() numero: string='12';
  @Input() cep: string='teste';
  @Input() tipo: string='Apartamento';
  @Input() valor: number=200.00;
}
