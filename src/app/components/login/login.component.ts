import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private snack: MatSnackBar,
    private auth: AuthService
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.showMessage('Por favor, preencha todos os campos');
      return;
    }

    this.loginService.buscarLogin(this.username, this.password).subscribe(
      (isValid: boolean) => {
        if (isValid) {
          this.auth.login(true);
          this.router.navigate(['/home']);
        } else {
          this.showMessage('Usuário ou senha inválidos');
        }
      },
      () => this.showMessage('Erro ao tentar fazer login')
    );
  }

  private showMessage(msg: string): void {
    this.snack.open(msg, 'OK', {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 5000
    });
  }
}
