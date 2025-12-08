import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkWithHref, RouterModule } from '@angular/router';
import {
  IonContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    RouterLinkWithHref,
    IonContent,
    IonButton,
    IonIcon
  ],
})
export class LoginPage {}
