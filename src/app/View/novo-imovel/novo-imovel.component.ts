import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';

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

  constructor(
    private http: HttpClient,
    private imovelController: ImovelController,
    private snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  handleInput(event: any): void {
    const inputText = event.target.value;
    if (!this.tipos.includes(inputText)) {
      event.target.value = '';
    }
  }

  buscarEnderecoPorCEP(): void {
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
          this.snackBar.open('CEP não encontrado', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error => {
        console.error('Ocorreu um erro ao buscar o endereço:', error);
        this.snackBar.open('Erro ao buscar o endereço', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  adicionarImovel(): void {
    const cep = (document.getElementById('cep') as HTMLInputElement).value;
    const estado = (document.getElementById('estado') as HTMLInputElement).value;
    const endereco = (document.getElementById('endereco') as HTMLInputElement).value;
    const numero = (document.getElementById('numero') as HTMLInputElement).value;
    const tipo = this.selectedTipo;
    const valor = Number((document.getElementById('valor') as HTMLInputElement).value);

    if (valor < 0 || valor > 100000) {
      this.snackBar.open('O valor do imóvel deve estar entre 0 e 100.000.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    if (!['Apartamento', 'Casa', 'Kitnet'].includes(tipo)) {
      this.snackBar.open('Tipo de imóvel inválido. Os tipos válidos são: Apartamento, Casa, Kitnet.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const novoImovel = {
      nome: this.bairro,
      estado: estado,
      endereco: endereco,
      numero: numero,
      cep: cep,
      tipo: tipo,
      valor: valor,
      alugada: false
    };

    this.imovelController.gravarImovel(novoImovel).subscribe(
      () => {
        this.snackBar.open('Imóvel cadastrado com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        this.limparCampos();
      },
      error => {
        console.error('Erro ao adicionar novo imóvel:', error);
        this.snackBar.open(error, 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
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
