import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AluguelController } from 'src/app/Controller/aluguel-controller.service';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';
import { Aluguel } from 'src/app/Model/entities/aluguel';
import { Imovel } from 'src/app/Model/entities/imovel';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alteraraluguel',
  templateUrl: './alteraraluguel.component.html',
  styleUrls: ['./alteraraluguel.component.css']
})
export class AlteraraluguelComponent implements OnInit {
  @Input() nome: string = 'Apartamento Itaim';
  @Input() estado: string = 'teste';
  @Input() endereco: string = 'teste';
  @Input() numero: string = '12';
  @Input() cep: string = 'teste';
  @Input() tipo: string = 'Apartamento';
  @Input() valor: number = 200.00;
  cpf: string = "";
  tiposPagamentos: string[] = ['PIX', 'Cartão de Crédito', 'Boleto', 'Dinheiro', 'Cartão de Débito'];
  selectedTipo = "";
  mask: string = 'separator.2';
  aluguelId!: number;
  imovel!: Imovel;
  aluguel!: Aluguel;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aluguelController: AluguelController,
    private imovelController: ImovelController,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.aluguelId = +params['id']; // '+' converte string para número
      this.buscarAluguel();
    });
  }

  buscarImovel(): void {
    this.imovelController.findById(Number(this.aluguel.imovel.id)).subscribe(imovelBuscado => {
      this.nome = imovelBuscado.nome;
      this.estado = imovelBuscado.estado;
      this.endereco = imovelBuscado.endereco;
      this.numero = imovelBuscado.numero;
      this.cep = imovelBuscado.cep;
      this.tipo = imovelBuscado.tipo;
      this.valor = imovelBuscado.valor;
      this.imovel = imovelBuscado;
    });
  }

  buscarAluguel(): void {
    this.aluguelController.findById(this.aluguelId).subscribe(aluguel => {
      if (aluguel) {
        this.nome = aluguel.nomeCliente;
        this.estado = aluguel.imovel.estado;
        this.endereco = aluguel.imovel.endereco;
        this.numero = aluguel.imovel.numero;
        this.cep = aluguel.imovel.cep;
        this.tipo = aluguel.imovel.tipo;
        this.valor = aluguel.imovel.valor;
        this.selectedTipo = aluguel.formaDePagamento;
        this.cpf = aluguel.cpf;
        this.aluguel = aluguel;
        this.buscarImovel(); // Busca o imóvel associado ao aluguel
      }
    }, error => {
      this.snackBar.open('Erro ao buscar aluguel', 'Fechar', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
    });
  }

  handleInput(event: any): void {
    const inputText = event.target.value;
    if (!this.tiposPagamentos.includes(inputText)) {
      event.target.value = '';
    }
  }

  atualizarAluguel(): void {
    const nomeCliente = (document.getElementById('nomeCliente') as HTMLInputElement).value;
    const cpf = (document.getElementById('cpf') as HTMLInputElement).value;

    if (!this.imovel) {
      this.snackBar.open('Imóvel não encontrado', 'Fechar', {
        duration: 3000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      });
      return;
    }

    const aluguelAtualizado: Aluguel = {
      id: this.aluguelId,
      nomeCliente,
      cpf,
      formaDePagamento: this.selectedTipo,
      imovel: this.imovel
    };

    this.aluguelController.updateAluguel(this.aluguelId, aluguelAtualizado).subscribe(
      () => {
        this.snackBar.open('Aluguel atualizado com sucesso', 'Fechar', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
        this.router.navigate(['/alugueis']); // Redirecionar após atualização
      },
      error => {
        console.error('Erro ao atualizar aluguel:', error);
        this.snackBar.open('Erro ao atualizar aluguel', 'Fechar', {
          duration: 3000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition
        });
      }
    );
  }
}
