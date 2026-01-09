import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  AlertController
} from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-calificaciones-estudiante',
  standalone: true,
  templateUrl: './calificaciones-estudiante.page.html',
  styleUrls: ['./calificaciones-estudiante.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard
  ],
})
export class CalificacionesEstudiantePage {

  calificaciones: any[] = [];
  nombreUsuario = '';

  constructor(
    private authService: AuthService,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter() {
    await this.authService.cargarSesion();

    const sesion = this.authService.usuario;
    if (!sesion) return;

    const usuario = sesion.usuario ?? sesion;
    this.nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;

    this.authService.obtenerCalificacionesEstudiante(usuario._id)
      .subscribe({
        next: (response: any) => {

          // 🔴 AQUÍ ESTABA TODO EL PROBLEMA
          const lista = response.calificaciones ?? [];

          this.calificaciones = lista.map((c: any) => ({
            curso: c.materia,
            promedio: c.promedioFinal,
            parcial1: c.parcial1,
            parcial2: c.parcial2,
            parcial3: c.parcial3
          }));
        },
        error: err => {
          console.error('ERROR CALIFICACIONES ESTUDIANTE', err);
        }
      });
  }

  async mostrarObservacion(nota: any) {
    const alert = await this.alertController.create({
      header: nota.curso,
      message: `
        <strong>Parcial 1</strong><br>
        Deberes: ${nota.parcial1?.deberes ?? 0}<br>
        Exámenes: ${nota.parcial1?.examenes ?? 0}<br>
        Trabajos: ${nota.parcial1?.trabajosClase ?? 0}<br>
        Proyectos: ${nota.parcial1?.proyectos ?? 0}<br>
        Promedio: ${nota.parcial1?.promedio ?? 0}<br><br>

        <strong>Parcial 2</strong><br>
        Deberes: ${nota.parcial2?.deberes ?? 0}<br>
        Exámenes: ${nota.parcial2?.examenes ?? 0}<br>
        Trabajos: ${nota.parcial2?.trabajosClase ?? 0}<br>
        Proyectos: ${nota.parcial2?.proyectos ?? 0}<br>
        Promedio: ${nota.parcial2?.promedio ?? 0}<br><br>

        <strong>Parcial 3</strong><br>
        Deberes: ${nota.parcial3?.deberes ?? 0}<br>
        Exámenes: ${nota.parcial3?.examenes ?? 0}<br>
        Trabajos: ${nota.parcial3?.trabajosClase ?? 0}<br>
        Proyectos: ${nota.parcial3?.proyectos ?? 0}<br>
        Promedio: ${nota.parcial3?.promedio ?? 0}<br><br>

        <strong>Promedio Final: ${nota.promedio}</strong>
      `,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
