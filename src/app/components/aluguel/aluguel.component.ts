import { Component, OnInit } from '@angular/core';
import { Aluguel } from 'src/app/entities/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';

@Component({
  selector: 'app-aluguel',
  templateUrl: './aluguel.component.html',
  styleUrls: ['./aluguel.component.css']
})
export class AluguelComponent implements OnInit {
  alugueis: Aluguel[] = [];
  filtroId: number | null = null;
  filtroCpf: string = '';

  constructor(private aluguelService: AluguelService) {}

  ngOnInit(): void {
    this.carregarAlugueis();
  }

  carregarAlugueis(): void {
    this.aluguelService.listarTodosAlugueis().subscribe(
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
      this.aluguelService.findById(this.filtroId).subscribe(
        (aluguel: Aluguel) => {
          this.alugueis = aluguel ? [aluguel] : [];
        },
        (error) => {
          console.error('Erro ao buscar aluguel por ID:', error);
        }
      );
    } else if (this.filtroCpf) {
      this.aluguelService.findByCpf(this.filtroCpf).subscribe(
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
