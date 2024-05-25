import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Imovel } from 'src/app/Model/entities/imovel';
import { AuthService } from 'src/app/Model/services/auth.service';
import { ImovelController } from 'src/app/Controller/imovel-controller.service';

@Component({
  selector: 'app-imovelid',
  templateUrl: './imovelid.component.html',
  styleUrls: ['./imovelid.component.css']
})
export class ImovelidComponent implements OnInit {
  imovelCarregado: Imovel | null = null;
  imovelId!: number;

  constructor(
    private imovelController: ImovelController,
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
    this.imovelController.findById(id).subscribe((imovel: Imovel) => {
      this.imovelCarregado = imovel;
    });
  }

  entrarCadastro(): void {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}
