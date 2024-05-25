import { Observable, throwError, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from '../entities/login';
import { environmentLogin } from '../environments/environments';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environmentLogin.baseUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  message(msg: string): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000,
    });
  }

  findById(id: number): Observable<Login> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Login>(url);
  }

  findAll(): Observable<Login[]> {
    return this.http.get<Login[]>(this.baseUrl);
  }

  buscarLogin(user: string, senha: string): Observable<boolean> {
    const url = `${this.baseUrl}/entrar/${user}/${senha}`;
    return this.http.get<boolean>(url);
  }

  gravarLogin(login: Login): Observable<boolean> {
    if (!this.validarLogin(login)) {
      this.snack.open('Dados de login inválidos', 'Fechar', {
        duration: 3000,
      });
      return of(false);
    }
    return this.http.post<Login>(this.baseUrl, login).pipe(
      map(() => true), // Retorna true se a solicitação for bem-sucedida
      catchError((error) => {
        console.error('Erro ao gravar login:', error);
        this.snack.open('Erro ao gravar login', 'Fechar', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  deletar(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  update(login: Login): Observable<Login> {
    const url = `${this.baseUrl}/${login.id}`;
    return this.http.put<Login>(url, login);
  }

  private validarLogin(login: Login): boolean {
    // Adicione suas validações de dados aqui
    if (!login.user || !login.senha) {
      return false;
    }
    return true;
  }
}
