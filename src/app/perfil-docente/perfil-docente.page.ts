import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-docente',
  standalone: true,
  templateUrl: './perfil-docente.page.html',
  styleUrls: ['./perfil-docente.page.scss'],
  imports: [CommonModule, IonContent, IonButton, IonIcon],
})
export class PerfilDocentePage {
  constructor(private router: Router) {}
  logout() {
    this.router.navigate(['/login']);
  }
}
