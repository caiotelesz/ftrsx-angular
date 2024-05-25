import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Imovel } from 'src/app/Model/entities/imovel';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'alterarimovel-imovel',
  templateUrl: './alterarimovel.component.html',
  styleUrls: ['./alterarimovel.component.css']
})
export class AlterarimovelComponent implements OnInit {
  tipos: string[] = ['Casa', 'Apartamento', 'Kitnet'];
  selectedTipo = "";
  bairro: string = '';
  imovel!: Imovel;
  id!: number;
  mask: string = 'separator.2';

  constructor(
    private http: HttpClient,
    private imovelController: ImovelController,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.buscarImovelPorId(this.id);
    });
  }

  buscarImovelPorId(id: number): void {
    this.imovelController.findById(id).subscribe(
      (imovel: Imovel) => {
        this.imovel = imovel;
        this.preencherCamposEndereco();
      },
      error => {
        console.error('Erro ao buscar o imóvel:', error);
        this.showMessage('Erro ao buscar o imóvel');
      }
    );
  }

  preencherCamposEndereco(): void {
    const cepInput = document.getElementById('cep') as HTMLInputElement;
    const estadoInput = document.getElementById('estado') as HTMLInputElement;
    const enderecoInput = document.getElementById('endereco') as HTMLInputElement;
    const numeroInput = document.getElementById('numero') as HTMLInputElement;
    const valorInput = document.getElementById('valor') as HTMLInputElement;

    if (cepInput && estadoInput && enderecoInput && numeroInput && valorInput) {
      cepInput.value = this.imovel.cep;
      estadoInput.value = this.imovel.estado;
      enderecoInput.value = this.imovel.endereco;
      numeroInput.value = String(this.imovel.numero);
      this.selectedTipo = this.imovel.tipo;
      valorInput.value = String(this.imovel.valor);
    }
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
          const estadoInput = document.getElementById('estado') as HTMLInputElement;
          const enderecoInput = document.getElementById('endereco') as HTMLInputElement;
          if (estadoInput && enderecoInput) {
            estadoInput.value = data.uf;
            enderecoInput.value = data.logradouro + ", " + data.bairro + ", " + data.localidade;
          }
        } else {
          console.log('CEP não encontrado');
        }
      },
      error => {
        console.error('Ocorreu um erro ao buscar o endereço:', error);
        this.showMessage('Erro ao buscar o endereço');
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

    if (cep && estado && endereco && numero && tipo && valor) {
      const novoImovel = {
        nome: this.bairro,
        cep: cep,
        estado: estado,
        endereco: endereco,
        numero: numero,
        tipo: tipo,
        valor: Number(valor),
        alugada: this.imovel.alugada
      };

      this.imovelController.updateImovel(this.id, novoImovel).subscribe(
        () => {
          console.log('Imóvel atualizado com sucesso!');
          this.showMessage('Imóvel atualizado com sucesso');
        },
        error => {
          console.error('Erro ao atualizar imóvel:', error);
          this.showMessage('Erro ao atualizar o imóvel');
        }
      );
    } else {
      this.showMessage('Por favor, preencha todos os campos');
    }
  }

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000,
    });
  }
}
