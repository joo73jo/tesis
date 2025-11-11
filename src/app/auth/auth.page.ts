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
import { SupabaseService } from '../core/supabase.service';

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
    private supabase: SupabaseService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.rol = params['role'];
    });
  }

  async login() {
    try {
      const usuario = await this.supabase.login(this.correo, this.contrasena);

      this.supabase.setSession(usuario);

      const alert = await this.alertController.create({
        header: 'Inicio de sesión exitoso',
        message: `Bienvenido ${usuario.rol === 'docente' ? 'Docente' : 'Estudiante'} ${usuario.usuario.nombres} ${usuario.usuario.apellidos}`,
        buttons: ['OK'],
      });

      await alert.present();
      await alert.onDidDismiss();

      if (usuario.rol === 'docente') {
        await this.router.navigate(['/tabs-docente/perfil']);
      } else {
        await this.router.navigate(['/tabs-estudiante/perfil']);
      }

    } catch {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }
}
