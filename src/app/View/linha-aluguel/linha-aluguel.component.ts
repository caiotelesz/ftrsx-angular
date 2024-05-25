import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Model/services/auth.service';
import { Aluguel } from 'src/app/Model/entities/aluguel';
import { AluguelController } from 'src/app/Controller/aluguel-controller.service';
import { Imovel } from 'src/app/Model/entities/imovel';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-linha-aluguel',
  templateUrl: './linha-aluguel.component.html',
  styleUrls: ['./linha-aluguel.component.css']
})
export class LinhaAluguelComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private aluguelController: AluguelController,
    private imovelController: ImovelController,
    private dialog: MatDialog
  ) {}

  @Input() aluguel!: Aluguel;
  @Input() imovel!: Imovel;
  @Output() aluguelDeletado = new EventEmitter<void>();

  alterarAluguel(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/aluguel/', Number(this.aluguel.id)]);
    }
  }

  alugarImovel(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/alugar/', Number(this.aluguel.imovel.id)]);
    }
  }

  verImovel(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/verimovel/', Number(this.aluguel.imovel.id)]);
    }
  }

  deletarAluguel(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Tem certeza que deseja deletar este aluguel?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.aluguelController.deletarAluguel(Number(this.aluguel.id)).subscribe(() => {
          console.log('Aluguel deletado com sucesso');
          this.aluguelDeletado.emit();
        }, error => {
          console.error('Erro ao deletar o aluguel:', error);
        });
      }
    });
  }
}
