import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-novo-imovel',
  templateUrl: './novo-imovel.component.html',
  styleUrls: ['./novo-imovel.component.css']
})
export class NovoImovelComponent {
  @Input() disponivel: boolean = true;
  @Input() nome: string='teste';

}
