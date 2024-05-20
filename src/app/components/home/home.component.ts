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
