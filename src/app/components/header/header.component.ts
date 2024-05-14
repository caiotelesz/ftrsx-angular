import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {}

  entrar(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/home']);
    }
  }
  entrarAlugados(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/alugados']);
    }
  }
  entrarDisponiveis(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/disponiveis']);
    }
  }
  entrarAlugueis(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/aluguel']);
    }
  }
  sair(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
