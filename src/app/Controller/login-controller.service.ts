import { Injectable } from '@angular/core';
import { Observable, throwError, of, catchError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../Model/services/login.service';
import { Login } from '../Model/entities/login';

@Injectable({
  providedIn: 'root',
})
export class LoginController {
  constructor(
    private loginService: LoginService,
    private snackBar: MatSnackBar
  ) {}

  findById(id: number): Observable<Login> {
    return this.loginService.findById(id);
  }

  findAll(): Observable<Login[]> {
    return this.loginService.findAll();
  }

  login(user: string, senha: string): Observable<boolean> {
    return this.loginService.buscarLogin(user, senha);
  }

  gravarLogin(login: Login): Observable<boolean> {
    if (!this.validarLogin(login)) {
      this.snackBar.open('Dados de login inválidos', 'Fechar', {
        duration: 3000,
      });
      return throwError(() => new Error('Dados de login inválidos'));
    }
    return this.loginService.gravarLogin(login).pipe(
      catchError((error) => {
        console.error('Erro ao gravar login:', error);
        this.snackBar.open('Erro ao gravar login', 'Fechar', {
          duration: 3000,
        });
        return of(false);
      })
    );
  }

  deletar(id: number): Observable<void> {
    return this.loginService.deletar(id);
  }

  update(login: Login): Observable<Login> {
    if (!this.validarLogin(login)) {
      this.snackBar.open('Dados de login inválidos', 'Fechar', {
        duration: 3000,
      });
      return throwError(() => new Error('Dados de login inválidos'));
    }
    return this.loginService.update(login);
  }

  private validarLogin(login: Login): boolean {
    if (!login.user || !login.senha) {
      return false;
    }
    return true;
  }
}
