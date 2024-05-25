import { Component, OnInit } from '@angular/core';
import { Aluguel } from 'src/app/Model/entities/aluguel';
import { AluguelController } from 'src/app/Controller/aluguel-controller.service';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css']
})
export class AluguelComponent implements OnInit {
  alugueis: Aluguel[] = [];
  filtroId: number | null = null;
  filtroCpf: string = '';

  constructor(private aluguelController: AluguelController) {}

  ngOnInit(): void {
    this.carregarAlugueis();
  }

  carregarAlugueis(): void {
    this.aluguelController.listarTodosAlugueis().subscribe(
      (alugueis: Aluguel[]) => {
        this.alugueis = alugueis;
      },
      (error) => {
        console.error('Erro ao carregar aluguéis:', error);
      }
    );
  }

  aplicarFiltros(): void {
    if (this.filtroId) {
      this.aluguelController.findById(this.filtroId).subscribe(
        (aluguel: Aluguel) => {
          this.alugueis = aluguel ? [aluguel] : [];
        },
        (error) => {
          console.error('Erro ao buscar aluguel por ID:', error);
        }
      );
    } else if (this.filtroCpf) {
      this.aluguelController.findByCpf(this.filtroCpf).subscribe(
        (alugueis: Aluguel[]) => {
          this.alugueis = alugueis;
        },
        (error) => {
          console.error('Erro ao buscar aluguéis por CPF:', error);
        }
      );
    } else {
      this.carregarAlugueis();
    }
  }

  limparFiltros(): void {
    this.filtroId = null;
    this.filtroCpf = '';
    this.carregarAlugueis();
  }
}
