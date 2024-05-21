import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Aluguel } from 'src/app/entities/aluguel';
import { AluguelService } from 'src/app/services/aluguel.service';
import { Imovel } from 'src/app/entities/imovel';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-linha-aluguel',
  templateUrl: './linha-aluguel.component.html',
  styleUrls: ['./linha-aluguel.component.css']
})
export class LinhaAluguelComponent {
  constructor(private authService: AuthService, private router: Router, private aluguelService: AluguelService, private imovelService: ImovelService) {}
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
  deletarAluguel(): void {
    this.aluguelService.deletarAluguel(Number(this.aluguel.id)).subscribe(() => {
      console.log('Aluguel deletado com sucesso');
      this
      this.aluguelDeletado.emit();
    });
  }
}
