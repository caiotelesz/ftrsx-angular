import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Aluguel } from 'src/app/entities/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';
import { Imovel } from 'src/app/entities/imovel';
import { ImovelService } from 'src/app/services/imovel.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-linha-aluguel',
  templateUrl: './linha-aluguel.component.html',
  styleUrls: ['./linha-aluguel.component.css']
})
export class LinhaAluguelComponent {
  constructor(private authService: AuthService, private router: Router, private aluguelService: AluguelService, private imovelService: ImovelService, private dialog: MatDialog) {}
  @Input() aluguel!: Aluguel;
  @Input() imovel!: Imovel;
  @Output() aluguelDeletado = new EventEmitter<void>();

  alterarAluguel(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/aluguel/', Number(this.aluguel.id)]);
    }
  }
  alugarImovel(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/alugar/', Number(this.aluguel.imovel.id)]);
    }
  }
  verImovel(){
    if(this.authService.isAuthenticatedUser())
      {
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
        this.aluguelService.deletarAluguel(Number(this.aluguel.id)).subscribe(() => {
          console.log('Imóvel deletado com sucesso');
          this.aluguelDeletado.emit();
        }, error => {
          console.error('Erro ao deletar o imóvel:', error);
        });
      }
    });
  }
}
