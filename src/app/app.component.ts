import { Component, computed, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  public finishedAuthCheck = computed<boolean>(() => {

    if (this.authService.authStatus() === AuthStatus.cheking) return false;

    return true;
  });

  public authStausChangeedEffect = effect(() => {

    console.log(this.authService.authStatus());

    switch (this.authService.authStatus()) {
      case AuthStatus.cheking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;

    }
  });

}
