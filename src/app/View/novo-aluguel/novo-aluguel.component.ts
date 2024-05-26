import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AluguelController } from 'src/app/Controller/aluguel-controller.service';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';
import { Imovel } from 'src/app/Model/entities/imovel';

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
    private imovelController: ImovelController,
    private aluguelController: AluguelController,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imovelId = +params['id'];
      this.buscarImovel();
    });
  }

  buscarImovel(): void {
    this.imovelController.findById(this.imovelId).subscribe(imovelBuscado => {
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

    this.aluguelController.gravarAluguel(novoAluguel).subscribe(
      () => {
        this.router.navigate(['/home']);
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
