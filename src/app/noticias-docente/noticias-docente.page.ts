import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-noticias-docente',
  standalone: true,
  templateUrl: './noticias-docente.page.html',
  styleUrls: ['./noticias-docente.page.scss'],
  imports: [CommonModule, IonContent, IonList, IonItem, IonLabel, IonIcon],
})
export class NoticiasDocentePage {
  abrirLink(url: string) {
    window.open(url, '_blank');
  }
}
