import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../../entities/aluno';
import { AlunoService } from '../../services/aluno.service';
@Component({
  selector: 'app-read-all',
  templateUrl: './read-all.component.html',
  styleUrls: ['./read-all.component.css']
})
export class ReadAllComponent implements OnInit {
  ativo = 0;//variável que irá contar os alunos ativos
  inativo = 0;
  list: Aluno[] = []; //limpe os alunos inseridos
  inativos: Aluno[] = [];
  constructor(private service: AlunoService, private router: Router) { } //criando um objeto do tipo AlunoService
  ngOnInit(): void {
    this.findAll();
    this.contarAtivos();
  }
  contarAtivos(): void {
    for (let aluno of this.list) {
      if (aluno.ativo)
        this.ativo++;
    }
  }

  findAll(): void {//nome do método(findAll) e tipo de retorno(void)
    this.service.findAll().subscribe((resposta) => {//criando um método semelhante ao lambda
      resposta.forEach(aluno => {
        this.formatarData();
        if (aluno.ativo) {
          this.list.push(aluno); //atribuindo os ativos a lista a resposta da consulta.
          this.ativo++;
        }
        else {
          this.inativos.push(aluno); //atribuindo os inativos a lista a resposta da consulta.
          this.inativo++;
        }
      });
    })
  }

  apagar(id: any): void {
    this.service.apagar(id).subscribe((resposta) => {
      if (resposta === null) {
        this.service.message('Registro excluído com sucesso');
        this.list = this.list.filter(aluno => aluno.ra != id);

      }
      else {
        this.service.message('Não foi possível excluir o Registro');
      }
    })
  }

  inativar(item: Aluno): void {
    item.ativo = false;
    this.service.atualizar(item).subscribe(() => {
      this.service.message('Aluno inativado com sucesso');
      this.list = this.list.filter(aluno => aluno.ra != item.ra);
      this.inativo++;
      //this.ativo--;
    })
  }



  verInativos(): void {
    this.router.navigate(['inativos']);
  }

  aluno: Aluno = {
    nome: '',
    ativo: true,
    dataCadastro: new Date(),
  };
  formatarData(): void {
    let data = new Date(this.aluno.dataCadastro).toISOString();
  }



}
