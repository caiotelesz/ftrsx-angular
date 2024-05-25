import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginController } from 'src/app/Controller/login-controller.service';
import { Login } from 'src/app/Model/entities/login';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  username: string = '';
  password: string = '';

  constructor(private loginController: LoginController, private snackBar: MatSnackBar) { }

  criarConta(): void {
    if (!this.username || !this.password) {
      this.snackBar.open('Por favor, preencha todos os campos.', 'Fechar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      return;
    }

    const newLogin: Login = { user: this.username, senha: this.password };

    this.loginController.gravarLogin(newLogin).subscribe(
      (isSuccess: boolean) => {
        if (isSuccess) {
          this.snackBar.open('Login cadastrado com sucesso!', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.clearForm();
        } else {
          this.snackBar.open('Erro ao cadastrar o login. Por favor, tente novamente mais tarde.', 'Fechar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        }
      },
      error => {
        console.error('Erro ao tentar cadastrar o login:', error);
        this.snackBar.open('Erro ao tentar cadastrar o login. Por favor, tente novamente mais tarde.', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
      }
    );
  }

  clearForm(): void {
    this.username = '';
    this.password = '';
  }
}
