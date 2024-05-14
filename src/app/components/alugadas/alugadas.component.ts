import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alugadas',
  templateUrl: './alugadas.component.html',
  styleUrls: ['./alugadas.component.css']
})
export class AlugadasComponent {
  constructor(private authService: AuthService, private router: Router) {}

  entrarCadastro(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}
