import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../../entities/aluno';
import { AlunoService } from '../../services/aluno.service';

@Component({
  selector: 'app-inativos',
  templateUrl: './inativos.component.html',
  styleUrls: ['./inativos.component.css']
})
export class InativosComponent implements OnInit {
  aluno: Aluno = {
    nome: '',
    ativo: true,
    dataCadastro: new Date(),
  };
  
  inativos: Aluno[] = [];
  constructor(private service: AlunoService,
    private router: Router) { } //criando um objeto de roteameno
  ngOnInit(): void {
    this.findAll();
  }
  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      this.formatarData();
      resposta.forEach(aluno => {
        if (!aluno.ativo) {
          this.inativos.push(aluno);
        }
      });
    });
  }
  retornar() {
    this.router.navigate(['']);
  }
  
  formatarData(): void {
    let data = new Date(this.aluno.dataCadastro).toISOString();
  }
}
