import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AluguelService } from 'src/app/services/aluguel.service';
import { ImovelService } from 'src/app/services/imovel.service';
import { Imovel } from 'src/app/entities/imovel';
import { Aluguel } from 'src/app/entities/aluguel';

@Component({
  selector: 'app-alteraraluguel',
  templateUrl: './alteraraluguel.component.html',
  styleUrls: ['./alteraraluguel.component.css']
})
export class AlteraraluguelComponent {
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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private aluguelService: AluguelService,
    private imovelService: ImovelService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.aluguelId = +params['id']; // '+' converte string para número
      this.buscarAluguel();
    });
  }

  buscarImovel(): void {
    this.imovelService.findById(Number(this.aluguel.imovel.id)).subscribe(imovelBuscado => {
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

  buscarAluguel(): void {
    this.aluguelService.findById(this.aluguelId).subscribe(aluguel => {
      if (aluguel) {
        // Ajustar conforme a estrutura da entidade Aluguel
        this.nome = aluguel.nomeCliente;
        this.estado = aluguel.imovel.estado;
        this.endereco = aluguel.imovel.endereco;
        this.numero = aluguel.imovel.numero.toString();
        this.cep = aluguel.imovel.cep;
        this.tipo = aluguel.imovel.tipo;
        this.valor = aluguel.imovel.valor;
        this.selectedTipo = aluguel.formaDePagamento;
        this.cpf = aluguel.cpf;
      }
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
    const aluguelAtualizado = {
      nomeCliente,
      cpf,
      formaDePagamento: this.selectedTipo,
      imovel: this.imovel // Assumindo que a estrutura inclui imovelId
    };

    this.aluguelService.updateAluguel(this.aluguelId, aluguelAtualizado).subscribe(
      () => {
        console.log('Aluguel atualizado com sucesso');
        this.router.navigate(['/alugueis']); // Redirecionar após atualização
      },
      error => {
        console.error('Erro ao atualizar aluguel:', error);
      }
    );
  }
}
