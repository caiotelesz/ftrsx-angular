import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ImovelService } from 'src/app/services/imovel.service';
import { MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Imovel } from 'src/app/entities/imovel';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'alterarimovel-imovel',
  templateUrl: './alterarimovel.component.html',
  styleUrls: ['./alterarimovel.component.css']
})
export class AlterarimovelComponent {
  tipos: string[] = ['Casa', 'Apartamento', 'Kitnet'];
  selectedTipo = "";
  mask: string = 'separator.2';
  bairro: string = '';
  imovel!: Imovel;
  id!: Number;

  constructor(private http: HttpClient, private imovelService: ImovelService, private snackBar: MatSnackBar, private route: ActivatedRoute) { }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.buscarImovelPorId(id);
    });
  }

  buscarImovelPorId(id: number): void {
    this.imovelService.findById(id).subscribe(
      (imovel: Imovel) => {
        this.imovel = imovel;
        this.preencherCamposEndereco();
      },
      error => {
        console.error('Erro ao buscar o imóvel:', error);
      }
    );
  }

  preencherCamposEndereco(): void {
    (document.getElementById('cep') as HTMLInputElement).value = this.imovel.cep;
    (document.getElementById('estado') as HTMLInputElement).value = this.imovel.estado;
    (document.getElementById('endereco') as HTMLInputElement).value = this.imovel.endereco;
    (document.getElementById('numero') as HTMLInputElement).value = String(this.imovel.numero);
    this.selectedTipo = this.imovel.tipo;
    (document.getElementById('valor') as HTMLInputElement).value = String(this.imovel.valor);
  }

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

  atualizarImovel(): void {
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
      numero: Number(numero),
      tipo: tipo,
      valor: Number(valor),
      alugada: false
    };

    this.imovelService.updateImovel(Number(this.imovel.id), novoImovel).subscribe(
      () => {
        console.log('Imóvel atualizado com sucesso!');
        this.snackBar.open('Imóvel atualizado com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      },
      error => {
        console.error('Erro ao atualizado imóvel:', error);
      }
    );
  }
}
