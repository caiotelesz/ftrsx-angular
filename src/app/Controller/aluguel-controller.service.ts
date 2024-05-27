import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CpfService } from './cpf.service';
import { AluguelService } from '../Model/services/aluguel.service';
import { Aluguel } from '../Model/entities/aluguel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AluguelController {
  constructor(
    private aluguelService: AluguelService,
    private cpfService: CpfService,
    private snackBar: MatSnackBar
  ) {}

  findById(id: number): Observable<Aluguel> {
    return this.aluguelService.findById(id);
  }

  findByCpf(cpf: string): Observable<Aluguel[]> {
    return this.aluguelService.findByCpf(cpf);
  }

  listarTodosAlugueis(): Observable<Aluguel[]> {
    return this.aluguelService.listarTodosAlugueis();
  }

  gravarAluguel(aluguel: Aluguel): Observable<Aluguel> {
    if (aluguel.imovel.alugada) {
      this.exibirMensagemErro('Imóvel já está alugado');
      return throwError(() => new Error(''));
    }
    const cpfSemPontuacao = this.removerPontuacaoCPF(aluguel.cpf);
    if (!this.cpfService.validarCPF(cpfSemPontuacao)) {
      this.exibirMensagemErro('CPF inválido');
      return throwError(() => new Error('CPF inválido'));
    }
    aluguel.cpf = cpfSemPontuacao;
    return this.aluguelService.gravarAluguel(aluguel).pipe(
      tap(() => this.exibirMensagemSucesso('Aluguel cadastrado com sucesso')),
      catchError(error => {
        this.exibirMensagemErro('Erro ao cadastrar aluguel');
        return throwError(error);
      })
    );
  }

  deletarAluguel(id: number): Observable<void> {
    return this.aluguelService.deletarAluguel(id).pipe(
      tap(() => this.exibirMensagemSucesso('Aluguel deletado com sucesso')),
      catchError(error => {
        this.exibirMensagemErro('Erro ao deletar aluguel');
        return throwError(error);
      })
    );
  }

  updateAluguel(id: number, aluguel: Aluguel): Observable<Aluguel> {
    const cpfSemPontuacao = this.removerPontuacaoCPF(aluguel.cpf);
    if (!this.cpfService.validarCPF(cpfSemPontuacao)) {
      this.exibirMensagemErro('CPF inválido');
      return throwError(() => new Error('CPF inválido'));
    }
    aluguel.cpf = cpfSemPontuacao;
    return this.aluguelService.updateAluguel(id, aluguel).pipe(
      tap(() => this.exibirMensagemSucesso('Aluguel atualizado com sucesso')),
      catchError(error => {
        this.exibirMensagemErro('Erro ao atualizar aluguel');
        return throwError(error);
      })
    );
  }

  private removerPontuacaoCPF(cpf: string): string {
    // Remove a pontuação do CPF (pontos e traços)
    return cpf.replace(/[.-]/g, '');
  }

  private exibirMensagemSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-success'],
    });
  }

  private exibirMensagemErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      panelClass: ['snackbar-error'],
    });
  }
}
