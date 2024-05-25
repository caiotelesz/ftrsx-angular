import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';
import { Imovel } from 'src/app/Model/entities/imovel';
import { AuthService } from 'src/app/Model/services/auth.service';
import { ImovelService } from 'src/app/Model/services/imovel.service';

@Component({
  selector: 'app-alugadas',
  templateUrl: './alugadas.component.html',
  styleUrls: ['./alugadas.component.css']
})
export class AlugadasComponent implements OnInit {
  imoveisAlugados: Imovel[] = [];

  constructor(
    private imovelController: ImovelController,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buscarImoveisAlugados();
  }

  buscarImoveisAlugados(): void {
    this.imovelController.listarImoveisAlugados().subscribe(
      (imoveis: Imovel[]) => {
        this.imoveisAlugados = imoveis;
      },
      error => {
        console.error('Erro ao buscar imóveis alugados:', error);
      }
    );
  }

  deletarImovel(id: number): void {
    this.imovelController.deletarImovel(id).subscribe(() => {
      this.snackBar.open('Imóvel deletado com sucesso', 'OK', {
        duration: 3000,
      });
      this.buscarImoveisAlugados();
    });
  }

  entrarCadastro(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/cadastroimovel']);
    } else {
      this.snackBar.open('Você precisa estar autenticado para acessar esta página', 'OK', {
        duration: 3000,
      });
    }
  }
}
