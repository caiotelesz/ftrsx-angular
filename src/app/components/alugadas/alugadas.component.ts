import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Imovel } from 'src/app/entities/imovel';
import { AuthService } from 'src/app/services/auth.service';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-alugadas',
  templateUrl: './alugadas.component.html',
  styleUrls: ['./alugadas.component.css']
})
export class AlugadasComponent implements OnInit {
  imoveisAlugados: Imovel[] = [];

  constructor(private imovelService: ImovelService, private router: Router, private authService: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.buscarImoveisAlugados();
  }

  buscarImoveisAlugados(): void {
    this.imovelService.listarImoveisAlugados().subscribe((imoveis: Imovel[]) => {
      this.imoveisAlugados = imoveis;
    });
  }

  deletarImovel(id: number): void {
    this.imovelService.deletarImovel(id).subscribe(() => {
      this.snackBar.open('Imóvel deletado com sucesso', 'OK', {
        duration: 3000,
      });
      this.buscarImoveisAlugados();
    });
  }

  entrarCadastro(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}

