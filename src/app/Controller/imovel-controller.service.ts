import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ImovelService } from '../Model/services/imovel.service';
import { Imovel } from '../Model/entities/imovel';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImovelController {
  constructor(
    private imovelService: ImovelService,
    private snackBar: MatSnackBar
  ) {}

  listarTodosImoveis(): Observable<Imovel[]> {
    return this.imovelService.listarTodosImoveis();
  }

  listarImoveisPorTipo(tipo: string): Observable<Imovel[]> {
    return this.imovelService.listarImoveisPorTipo(tipo);
  }

  listarImoveisPorCep(cep: string): Observable<Imovel[]> {
    return this.imovelService.listarImoveisPorCep(cep);
  }

  listarImoveisPorTipoECep(tipo: string, cep: string): Observable<Imovel[]> {
    return this.imovelService.listarImoveisPorTipoECep(tipo, cep);
  }

  findById(id: number): Observable<Imovel> {
    return this.imovelService.findById(id);
  }

  listarImoveisAlugados(): Observable<Imovel[]> {
    return this.imovelService.listarImoveisAlugados();
  }

  listarImoveisDisponiveis(): Observable<Imovel[]> {
    return this.imovelService.listarImoveisDisponiveis();
  }

  gravarImovel(imovel: Imovel): Observable<Imovel | boolean> {
    if (!this.validarImovel(imovel)) {
      this.exibirMensagemErro('Dados do imóvel inválidos');
      return throwError(() => new Error('Dados do imóvel inválidos'));
    }

    return this.imovelService.listarImoveisPorEndereco(imovel.endereco, imovel.numero).pipe(
      switchMap((imoveisExistentes: Imovel[]) => {
        if (imoveisExistentes.length > 0) {
          this.exibirMensagemErro('Imóvel já cadastrado com o mesmo endereço e número');
          return throwError(() => new Error('Imóvel já cadastrado com o mesmo endereço e número'));
        }
        return this.imovelService.gravarImovel(imovel).pipe(
          tap(() => this.exibirMensagemSucesso('Imóvel cadastrado com sucesso')),
          catchError(() => {
            this.exibirMensagemErro('Erro ao cadastrar o imóvel');
            return throwError(() => new Error('Erro ao cadastrar o imóvel'));
          })
        );
      })
    );
  }

  updateImovel(id: number, imovel: Imovel): Observable<Imovel> {
    return this.imovelService.updateImovel(id, imovel).pipe(
      catchError(() => {
        this.exibirMensagemErro('Erro ao atualizar o imóvel');
        throw throwError(() => new Error('Erro ao atualizar o imóvel'));
      }),
      tap(() => this.exibirMensagemSucesso('Imóvel atualizado com sucesso'))
    );
  }

  deletarImovel(id: number): Observable<void> {
    return this.imovelService.deletarImovel(id).pipe(
      catchError(() => {
        this.exibirMensagemErro('Erro ao deletar o imóvel');
        return throwError(() => new Error('Erro ao deletar o imóvel'));
      }),
      tap(() => this.exibirMensagemSucesso('Imóvel deletado com sucesso'))
    );
  }

  private exibirMensagemSucesso(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
      panelClass: ['snackbar-success'],
    });
  }

  private exibirMensagemErro(mensagem: string): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: 5000,
      horizontalPosition: 'start',
      verticalPosition: 'top',
      panelClass: ['snackbar-error'],
    });
  }

  private validarImovel(imovel: Imovel): boolean {
    if (!imovel.endereco || !imovel.cep || !imovel.tipo) {
      return false;
    }
    if (!this.validarCep(imovel.cep)) {
      return false;
    }
    const valorRegex = /^\d+(\.\d{1,2})?$/;
    if (!valorRegex.test(imovel.valor.toString()) || imovel.valor <= 0 || imovel.valor > 100000) {
      return false;
    }
    return true;
  }

  private validarCep(cep: string): boolean {
    const cepRegex = /^\d{5}-?\d{3}$/;
    return cepRegex.test(cep);
  }

}
