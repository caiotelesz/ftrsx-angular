import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImovelService } from 'src/app/services/imovel.service';
import { Imovel } from 'src/app/entities/imovel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  imoveis: Imovel[] = [];
  filtroTipo: string = '';
  filtroCep: string = '';
  filtroId: number | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private imovelService: ImovelService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.carregarImoveis();
  }

  carregarImoveis(): void {
    this.imovelService.listarTodosImoveis().subscribe(
      (imoveis: Imovel[]) => {
        this.imoveis = imoveis;
      },
      (error) => {
        console.error('Erro ao carregar imóveis:', error);
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
          this.imoveis = imovel ? [imovel] : [];
        },
        (error) => {
          console.error('Erro ao buscar imóvel por ID:', error);
        }
      );
    } else if (this.filtroTipo && cepFormatado) {
      this.imovelService.listarImoveisPorTipoECep(this.filtroTipo, cepFormatado).subscribe(
        (imoveis: Imovel[]) => {
          this.imoveis = imoveis;
        },
        (error) => {
          console.error('Erro ao buscar imóveis por tipo e CEP:', error);
        }
      );
    } else if (this.filtroTipo) {
      this.imovelService.listarImoveisPorTipo(this.filtroTipo).subscribe(
        (imoveis: Imovel[]) => {
          this.imoveis = imoveis;
        },
        (error) => {
          console.error('Erro ao buscar imóveis por tipo:', error);
        }
      );
    } else if (cepFormatado) {
      this.imovelService.listarImoveisPorCep(cepFormatado).subscribe(
        (imoveis: Imovel[]) => {
          this.imoveis = imoveis;
        },
        (error) => {
          console.error('Erro ao buscar imóveis por CEP:', error);
        }
      );
    } else {
      this.carregarImoveis();
    }
  }

  limparFiltros(): void {
    this.filtroTipo = '';
    this.filtroCep = '';
    this.filtroId = null;
    this.carregarImoveis();
  }

  deletarImovel(id: number): void {
    this.imovelService.deletarImovel(id).subscribe(() => {
      this.snackBar.open('Imóvel deletado com sucesso', 'OK', {
        duration: 3000,
      });
      this.carregarImoveis(); // Recarrega a lista de imóveis
    });
  }

  entrarCadastro(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}
