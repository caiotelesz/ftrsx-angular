import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Imovel } from 'src/app/entities/imovel';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-linha-imovel',
  templateUrl: './linha-imovel.component.html',
  styleUrls: ['./linha-imovel.component.css']
})
export class LinhaImovelComponent {
  constructor(private authService: AuthService, private router: Router, private imovelService: ImovelService) {}
  @Input() imovel!: Imovel;
  @Output() imovelDeletado = new EventEmitter<void>();

  get disponivel(): boolean {
    return !this.imovel.alugada;
  }

  alterarImovel(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/imovel/', this.imovel.id]);
    }
  }
  alugar(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/alugar/', this.imovel.id]);
    }
  }
  deletarImovel(): void {
    this.imovelService.deletarImovel(Number(this.imovel.id)).subscribe(() => {
      console.log('Imóvel deletado com sucesso');
      this.imovelDeletado.emit();
    });
  }
}
