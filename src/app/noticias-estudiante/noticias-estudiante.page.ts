import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-noticias-estudiante',
  templateUrl: './noticias-estudiante.page.html',
  styleUrls: ['./noticias-estudiante.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NoticiasEstudiantePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
