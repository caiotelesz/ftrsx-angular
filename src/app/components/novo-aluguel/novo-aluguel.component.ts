import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AluguelService } from 'src/app/services/aluguel.service';
import { ImovelService } from 'src/app/services/imovel.service';
import { Imovel } from 'src/app/entities/imovel';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-novo-aluguel',
  templateUrl: './novo-aluguel.component.html',
  styleUrls: ['./novo-aluguel.component.css']
})
export class NovoAluguelComponent implements OnInit {
  @Input() nome: string = 'Apartamento Itaim';
  @Input() estado: string = 'teste';
  @Input() endereco: string = 'teste';
  @Input() numero: string = '12';
  @Input() cep: string = 'teste';
  @Input() tipo: string = 'Apartamento';
  @Input() valor: number = 200.00;
  tiposPagamentos: string[] = ['PIX', 'Cartão de Crédito', 'Boleto', 'Dinheiro', 'Cartão de Débito'];
  selectedTipo: string = "";
  mask: string = 'separator.2';
  imovelId!: number;
  imovel!: Imovel;

  constructor(
    private route: ActivatedRoute,
    private imovelService: ImovelService,
    private aluguelService: AluguelService,
    private http: HttpClient, private snackBar: MatSnackBar
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imovelId = +params['id']; // '+' converte string para número
      this.buscarImovel();
    });
  }

  buscarImovel(): void {
    this.imovelService.findById(this.imovelId).subscribe(imovelBuscado => {
      this.nome = imovelBuscado.nome;
      this.estado = imovelBuscado.estado;
      this.endereco = imovelBuscado.endereco;
      this.numero = imovelBuscado.numero.toString();
      this.cep = imovelBuscado.cep;
      this.tipo = imovelBuscado.tipo;
      this.valor = imovelBuscado.valor;
      this.imovel = imovelBuscado;
    });
  }

  handleInput(event: any): void {
    const inputText = event.target.value;
    if (!this.tiposPagamentos.includes(inputText)) {
      event.target.value = '';
    }
  }

  cadastrarAluguel(): void {
    const nomeCliente = (document.getElementById('nomeCliente') as HTMLInputElement).value;
    const cpf = (document.getElementById('cpf') as HTMLInputElement).value;
    const novoAluguel = {
      nomeCliente,
      cpf,
      formaDePagamento: this.selectedTipo,
      imovel: this.imovel
    };

    this.aluguelService.gravarAluguel(novoAluguel).subscribe(
      () => {
        console.log('Aluguel cadastrado com sucesso');
        this.snackBar.open('Imóvel alugado com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      },
      error => {
        console.error('Erro ao cadastrar aluguel:', error);
      }
    );
  }
}
