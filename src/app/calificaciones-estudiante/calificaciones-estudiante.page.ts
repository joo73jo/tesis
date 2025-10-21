import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calificaciones-estudiante',
  standalone: true,
  templateUrl: './calificaciones-estudiante.page.html',
  styleUrls: ['./calificaciones-estudiante.page.scss'],
  imports: [CommonModule, IonContent],
})
export class CalificacionesEstudiantePage {}
