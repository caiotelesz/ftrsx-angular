import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'alterarimovel-imovel',
  templateUrl: './alterarimovel.component.html',
  styleUrls: ['./alterarimovel.component.css']
})
export class AlterarimovelComponent {
  tipos: string[] = ['Casa', 'Apartamento', 'Sobrado'];
  selectedTipo = "";
  constructor(private http: HttpClient) { }

  handleInput(event: any) {
    const inputText = event.target.value;
    if (!this.tipos.includes(inputText)) {
      event.target.value = ''; // Limpa o valor se não estiver na lista
    }
  }
  buscarEnderecoPorCEP() {
    const cep = (document.getElementById('cep') as HTMLInputElement).value;
    if (cep.length !== 8) {
      // CEP inválido
      return;
    }

    this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`).subscribe(
      data => {
        if (!data.erro) {
          // Preencher os campos com os dados do endereço
          (document.getElementById('estado') as HTMLInputElement).value = data.uf;
          (document.getElementById('endereco') as HTMLInputElement).value = data.logradouro + ", " + data.bairro + ", " + data.localidade;
          // Preencher outros campos conforme necessário
        } else {
          // CEP não encontrado
          console.log('CEP não encontrado');
        }
      },
      error => {
        console.error('Ocorreu um erro ao buscar o endereço:', error);
      }
    );
  }
}
