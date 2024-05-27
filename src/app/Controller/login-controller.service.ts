import { Injectable } from '@angular/core';
import { Observable, throwError, of, catchError, map, switchMap  } from 'rxjs';
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

  loginBuscado!: Observable<Boolean>;

  findById(id: number): Observable<Login> {
    return this.loginService.findById(id);
  }

  findAll(): Observable<Login[]> {
    return this.loginService.findAll();
  }

  gravarLogin(login: Login): Observable<boolean> {
    return this.login(login.user, login.senha).pipe(
      switchMap((loginExiste) => {
        if (loginExiste) {
          this.snackBar.open('Login já cadastrado!', 'Fechar', {
            duration: 3000,
          });
          return throwError(() => new Error('Login já cadastrado!'));
        }
        if (!this.validarLogin(login)) {
          this.snackBar.open('Dados de login inválidos', 'Fechar', {
            duration: 3000,
          });
          return throwError(() => new Error('Dados de login inválidos'));
        }
        return this.loginService.gravarLogin(login).pipe(
          map(() => true),
          catchError((error) => {
            console.error('Erro ao gravar login:', error);
            this.snackBar.open('Erro ao gravar login', 'Fechar', {
              duration: 3000,
            });
            return of(false);
          })
        );
      })
    );
  }

  login(user: string, senha: string): Observable<boolean> {
    return this.loginService.buscarLogin(user, senha).pipe(
      map((result) => !!result) // converte o resultado para um booleano
    );
  }

  validarLogin(login: Login): boolean {
    if (!login.user || !login.senha) {
      return false;
    }
    const userRegex = /^[a-zA-Z0-9._-]{3,}$/;
    const senhaRegex = /^[a-zA-Z0-9._-]{4,}$/;
    return userRegex.test(login.user) && senhaRegex.test(login.senha);
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
}
