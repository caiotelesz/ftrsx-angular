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

  constructor(private imovelService: ImovelService, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.buscarImoveisDisponiveis();
  }

  buscarImoveisDisponiveis(): void {
    this.imovelService.listarImoveisDisponiveis().subscribe((imoveis: Imovel[]) => {
      this.imoveisDisponiveis = imoveis;
    });
  }

  deletarImovel(id: number): void {
    this.imovelService.deletarImovel(id).subscribe(() => {
      this.snackBar.open('Imóvel deletado com sucesso', 'OK', {
        duration: 3000,
      });
      this.buscarImoveisDisponiveis();
    });
  }

  entrarCadastro(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}

