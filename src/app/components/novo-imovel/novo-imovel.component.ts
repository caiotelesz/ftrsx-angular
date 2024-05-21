import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImovelService } from 'src/app/services/imovel.service';
import { MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novo-imovel',
  templateUrl: './novo-imovel.component.html',
  styleUrls: ['./novo-imovel.component.css']
})
export class NovoImovelComponent {
  tipos: string[] = ['Casa', 'Apartamento', 'Kitnet'];
  selectedTipo = "";
  mask: string = 'separator.2';
  bairro: string = '';

  constructor(private http: HttpClient, private imovelService: ImovelService, private snackBar: MatSnackBar) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  handleInput(event: any) {
    const inputText = event.target.value;
    if (!this.tipos.includes(inputText)) {
      event.target.value = '';
    }
  }

  buscarEnderecoPorCEP() {
    const cep = (document.getElementById('cep') as HTMLInputElement).value;
    const cepSemHifen = cep.replace('-', '');
    console.log('Buscando endereço para o CEP:', cepSemHifen);
    if (cepSemHifen.length !== 8) {
      return;
    }

    this.http.get<any>(`https://viacep.com.br/ws/${cepSemHifen}/json/`).subscribe(
      data => {
        if (!data.erro) {
          this.bairro = data.bairro;
          (document.getElementById('estado') as HTMLInputElement).value = data.uf;
          (document.getElementById('endereco') as HTMLInputElement).value = data.logradouro + ", " + data.bairro + ", " + data.localidade;
        } else {
          console.log('CEP não encontrado');
        }
      },
      error => {
        console.error('Ocorreu um erro ao buscar o endereço:', error);
      }
    );
  }

  adicionarImovel(): void {
    const cep = (document.getElementById('cep') as HTMLInputElement).value;
    const estado = (document.getElementById('estado') as HTMLInputElement).value;
    const endereco = (document.getElementById('endereco') as HTMLInputElement).value;
    const numero = (document.getElementById('numero') as HTMLInputElement).value;
    const tipo = this.selectedTipo;
    const valor = (document.getElementById('valor') as HTMLInputElement).value;

    const novoImovel = {
      nome: this.bairro,
      cep: cep,
      estado: estado,
      endereco: endereco,
      numero: numero,
      tipo: tipo,
      valor: Number(valor),
      alugada: false
    };

    this.imovelService.gravarImovel(novoImovel).subscribe(
      () => {
        console.log('Novo imóvel adicionado com sucesso!');
        this.snackBar.open('Imóvel cadastrado com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this.limparCampos();
      },
      error => {
        console.error('Erro ao adicionar novo imóvel:', error);
      }
    );
  }

  limparCampos(): void {
    (document.getElementById('cep') as HTMLInputElement).value = '';
    (document.getElementById('estado') as HTMLInputElement).value = '';
    (document.getElementById('endereco') as HTMLInputElement).value = '';
    (document.getElementById('numero') as HTMLInputElement).value = '';
    this.selectedTipo = '';
    (document.getElementById('valor') as HTMLInputElement).value = '';
  }
}
