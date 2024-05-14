import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-disponiveis',
  templateUrl: './disponiveis.component.html',
  styleUrls: ['./disponiveis.component.css']
})
export class DisponiveisComponent {
  constructor(private authService: AuthService, private router: Router) {}

  entrarCadastro(){
    if(this.authService.isAuthenticatedUser())
      {
      this.router.navigate(['/cadastroimovel']);
    }
  }
}
