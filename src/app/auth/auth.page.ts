import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonIcon,
  AlertController
} from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    IonContent,
    IonInput,
    IonButton,
    IonItem,
    IonIcon
  ],
})
export class AuthPage implements OnInit {

  correo = '';
  contrasena = '';
  rol = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.rol = params['role'];
    });
  }

  async login() {
    const body = { email: this.correo, password: this.contrasena };

    try {
      let respuesta: any;

      if (this.rol === 'docente') {
        respuesta = await lastValueFrom(
          this.auth.loginDocente(body.email, body.password)
        );
      } else {
        respuesta = await lastValueFrom(
          this.auth.loginEstudiante(body.email, body.password)
        );
      }

      await this.auth.guardarSesion(respuesta);

      const alert = await this.alertController.create({
        header: 'Inicio de sesión exitoso',
        message: `Bienvenido ${respuesta.nombre} ${respuesta.apellido}`,
        buttons: ['OK'],
      });

      await alert.present();
      await alert.onDidDismiss();

      if (respuesta.rol === 'docente') {
        this.router.navigate(['/tabs-docente']);
      } else {
        this.router.navigate(['/tabs-estudiante']);
      }

    } catch (error: any) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: error?.error?.msg ?? 'Error al iniciar sesión',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
