import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonContent,
  IonButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabs-docente',
  standalone: true,
  templateUrl: './tabs-docente.page.html',
  styleUrls: ['./tabs-docente.page.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonContent,
    IonButton
  ],
})
export class TabsDocentePage {
  constructor(private router: Router) {}
  logout() {
    this.router.navigate(['/login']);
  }
}
