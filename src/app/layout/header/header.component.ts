import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FirebaseApp } from '@angular/fire/app';
import { getAuth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  private router: Router = inject(Router);
  private app: FirebaseApp = inject(FirebaseApp);

  signOut() {
    const auth: Auth = getAuth(this.app);
    signOut(auth).then(() => {
      this.router.navigate(['login']);
    }).catch((err) => console.error(err))
  }
}
