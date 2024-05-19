import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Aluno } from '../entities/imovel';
import { environmentLogin } from '../environments/environments';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  baseUrl = environmentLogin.baseUrl;
  constructor(private http: HttpClient, private snack: MatSnackBar) {}
  message(msg: String): void {
    this.snack.open(`${msg}`, `OK`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  pesquisarRA(ra: any): Observable<Aluno> {
    const url = `${this.baseUrl}/${ra}`;
    return this.http.get<Aluno>(url);
  }

  findAll(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.baseUrl);
  }

  /*método que irá apagar um registro*/
  apagar(id: any): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    const url = `${this.baseUrl}/${aluno.ra}`;
    return this.http.put<Aluno>(url, aluno);
  }

  cadastrar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.baseUrl, aluno);
  }
}
