// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  username: string = 'teste';
  password: string = 'teste';
  private isAuthenticated: boolean = false;

  constructor() { }

  login(validado: boolean): boolean {
    if(validado === true){
      this.isAuthenticated = true;
      return true;
    }
    else{
      return false;
    }
  }

  logout() {
    this.isAuthenticated = false;
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
