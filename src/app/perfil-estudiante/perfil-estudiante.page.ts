import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
  imports: [CommonModule, IonContent, IonButton, IonIcon],
})
export class PerfilEstudiantePage {
  constructor(private router: Router) {}
  logout() {
    this.router.navigate(['/login']);
  }
}
