import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/Model/services/auth.service';
import { Imovel } from 'src/app/Model/entities/imovel';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-linha-imovel',
  templateUrl: './linha-imovel.component.html',
  styleUrls: ['./linha-imovel.component.css']
})
export class LinhaImovelComponent {
  @Input() imovel!: Imovel;
  @Output() imovelDeletado = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private imovelController: ImovelController,
    private dialog: MatDialog
  ) {}

  get disponivel(): boolean {
    return !this.imovel.alugada;
  }

  alterarImovel() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/imovel/', this.imovel.id]);
    }
  }

  alugar() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/alugar/', this.imovel.id]);
    }
  }

  deletarImovel(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: this.imovel.alugada
          ? 'Este imóvel está alugado. Deseja continuar e deletar também o aluguel associado?'
          : 'Tem certeza que deseja deletar este imóvel?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.imovelController.deletarImovel(Number(this.imovel.id)).subscribe(() => {
          console.log('Imóvel deletado com sucesso');
          this.imovelDeletado.emit();
        }, error => {
          console.error('Erro ao deletar o imóvel:', error);
        });
      }
    });
  }
}
