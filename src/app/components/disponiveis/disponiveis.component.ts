import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Imovel } from 'src/app/entities/imovel';
import { AuthService } from 'src/app/services/auth.service';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-disponiveis',
  templateUrl: './disponiveis.component.html',
  styleUrls: ['./disponiveis.component.css']
})
export class DisponiveisComponent implements OnInit {
  imoveisDisponiveis: Imovel[] = [];
  filtroTipo: string = '';
  filtroCep: string = '';
  filtroId: number | null = null;

  constructor(
    private imovelService: ImovelService,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buscarImoveisDisponiveis();
  }

  buscarImoveisDisponiveis(): void {
    this.imovelService.listarImoveisDisponiveis().subscribe(
      (imoveis: Imovel[]) => {
        this.imoveisDisponiveis = imoveis;
      },
      (error) => {
        console.error('Erro ao buscar imóveis disponíveis:', error);
      }
    );
  }

  formatarCep(cep: string): string {
    if (cep.length === 8) {
      return cep.slice(0, 5) + '-' + cep.slice(5);
    }
    return cep;
  }

  aplicarFiltros(): void {
    const cepFormatado = this.formatarCep(this.filtroCep);

    if (this.filtroId) {
      this.imovelService.findById(this.filtroId).subscribe(
        (imovel: Imovel) => {
          this.imoveisDisponiveis = imovel ? [imovel] : [];
        },
        (error) => {
          console.error('Erro ao buscar imóvel por ID:', error);
        }
      );
    } else if (this.filtroTipo && cepFormatado) {
      this.imovelService.listarImoveisPorTipoECep(this.filtroTipo, cepFormatado).subscribe(
        (imoveis: Imovel[]) => {
          this.imoveisDisponiveis = imoveis;
        },
        (error) => {
          console.error('Erro ao buscar imóveis por tipo e CEP:', error);
        }
      );
    } else if (this.filtroTipo) {
      this.imovelService.listarImoveisPorTipo(this.filtroTipo).subscribe(
        (imoveis: Imovel[]) => {
          this.imoveisDisponiveis = imoveis;
        },
        (error) => {
          console.error('Erro ao buscar imóveis por tipo:', error);
        }
      );
    } else if (cepFormatado) {
      this.imovelService.listarImoveisPorCep(cepFormatado).subscribe(
        (imoveis: Imovel[]) => {
          this.imoveisDisponiveis = imoveis;
        },
        (error) => {
          console.error('Erro ao buscar imóveis por CEP:', error);
        }
      );
    } else {
      this.buscarImoveisDisponiveis();
    }
  }

  limparFiltros(): void {
    this.filtroTipo = '';
    this.filtroCep = '';
    this.filtroId = null;
    this.buscarImoveisDisponiveis();
  }

  deletarImovel(id?: number): void {
    if (id) {
      this.imovelService.deletarImovel(id).subscribe(() => {
        this.snackBar.open('Imóvel deletado com sucesso', 'OK', {
          duration: 3000,
        });
        this.buscarImoveisDisponiveis();
      });
    }
  }

  entrarCadastro(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}
