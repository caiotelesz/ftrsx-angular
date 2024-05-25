import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Model/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private authService: AuthService, private router: Router) {}

  entrarSobre() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/sobre']);
    }
  }
  entrarPolitica() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/politica']);
    }
  }
  entrarTermos() {
    if (this.authService.isAuthenticatedUser()) {
      this.router.navigate(['/termosecondicoes']);
    }
  }
}
