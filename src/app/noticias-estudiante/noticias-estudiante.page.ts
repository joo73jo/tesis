import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-noticias-estudiante',
  standalone: true,
  templateUrl: './noticias-estudiante.page.html',
  styleUrls: ['./noticias-estudiante.page.scss'],
  imports: [CommonModule, IonContent, IonList, IonItem, IonLabel, IonIcon],
})
export class NoticiasEstudiantePage {
  abrirLink(url: string) {
    window.open(url, '_blank');
  }
}
