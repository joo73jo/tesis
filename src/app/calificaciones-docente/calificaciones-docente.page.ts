import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calificaciones-docente',
  templateUrl: './calificaciones-docente.page.html',
  styleUrls: ['./calificaciones-docente.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CalificacionesDocentePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
