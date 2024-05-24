import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Imovel } from 'src/app/entities/imovel';
import { AuthService } from 'src/app/services/auth.service';
import { ImovelService } from 'src/app/services/imovel.service';

@Component({
  selector: 'app-imovelid',
  templateUrl: './imovelid.component.html',
  styleUrls: ['./imovelid.component.css']
})
export class ImovelidComponent {
  imovelCarregado: Imovel | null = null;
  imovelId!: number;

  constructor(
    private imovelService: ImovelService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.imovelId = +params['id'];
      this.carregarImovel(this.imovelId);
    });
  }

  carregarImovel(id: number): void {
    this.imovelService.findById(id).subscribe((imovel: Imovel) => {
      this.imovelCarregado = imovel;
    });
  }

  entrarCadastro(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}
