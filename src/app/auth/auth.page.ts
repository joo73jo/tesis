import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonContent, IonInput, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
  imports: [CommonModule, FormsModule, IonContent, IonInput, IonItem, IonButton, IonIcon],
})
export class AuthPage {
  usuario = '';
  contrasena = '';
  role = '';

  constructor(
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private router: Router
  ) {
    this.role = this.route.snapshot.queryParamMap.get('role') || '';
  }

  async login() {
    const credenciales = {
      docente: { user: 'joel.docente', pass: '12345' },
      estudiante: { user: 'joel.estudiante', pass: '12345' },
    };

    const valido =
      (this.role === 'docente' &&
        this.usuario === credenciales.docente.user &&
        this.contrasena === credenciales.docente.pass) ||
      (this.role === 'estudiante' &&
        this.usuario === credenciales.estudiante.user &&
        this.contrasena === credenciales.estudiante.pass);

    if (!valido) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    const alert = await this.alertCtrl.create({
      header: 'Inicio de sesión exitoso',
      message: `Bienvenido ${this.role === 'docente' ? 'Docente Joel Parra' : 'Estudiante Joel Parra'}`,
      buttons: ['OK'],
    });

    await alert.present();
    await alert.onDidDismiss();

    if (this.role === 'docente') {
      this.router.navigate(['/tabs-docente']);
    } else {
      this.router.navigate(['/tabs-estudiante']);
    }
  }
}
