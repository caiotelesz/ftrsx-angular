import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alteraraluguel',
  templateUrl: './alteraraluguel.component.html',
  styleUrls: ['./alteraraluguel.component.css']
})
export class AlteraraluguelComponent {
  @Input() nome: string='Apartamento Itaim';
  @Input() estado: string='teste';
  @Input() endereco: string='teste';
  @Input() numero: string='12';
  @Input() cep: string='teste';
  @Input() tipo: string='Apartamento';
  @Input() valor: number=200.00;
  tiposPagamentos: string[] = ['PIX', 'Cartão de Crédito', 'Boleto', 'Dinheiro', 'Cartão de Débito'];
  selectedTipo = "";
  mask: string = 'separator.2';

  constructor(private http: HttpClient) { }

  handleInput(event: any) {
    const inputText = event.target.value;
    if (!this.tiposPagamentos.includes(inputText)) {
      event.target.value = '';
    }
  }
}
