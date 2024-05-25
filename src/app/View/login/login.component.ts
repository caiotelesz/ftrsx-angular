import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/Model/services/auth.service';
import { LoginController } from 'src/app/Controller/login-controller.service';

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
    private loginController: LoginController,
    private snack: MatSnackBar,
    private auth: AuthService
  ) {}

  login(): void {
    if (!this.username || !this.password) {
      this.showMessage('Por favor, preencha todos os campos');
      return;
    }

    this.loginController.login(this.username, this.password).subscribe(
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
