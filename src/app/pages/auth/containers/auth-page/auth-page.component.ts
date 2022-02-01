import { Component } from '@angular/core';
import { AuthService } from '../../services';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  constructor(
    private authService: AuthService,
  ) {
  }

  public sendLoginForm({email, password}: { email: string, password: string }): void {
    this.authService.login(email, password);
  }

  public loginWithGoogle() {
    this.authService.loginGoogle()
  }

  public sendSignForm({email, password}: { email: string, password: string }): void {
    this.authService.signIn(email, password);
  }
}
