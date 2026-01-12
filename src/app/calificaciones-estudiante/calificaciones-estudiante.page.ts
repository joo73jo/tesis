import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  AlertController,
} from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-calificaciones-estudiante',
  standalone: true,
  templateUrl: './calificaciones-estudiante.page.html',
  styleUrls: ['./calificaciones-estudiante.page.scss'],
  imports: [CommonModule, IonContent, IonGrid, IonRow, IonCol, IonCard],
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

    this.authService.obtenerCalificacionesEstudiante(usuario._id).subscribe({
      next: (response: any) => {
        const lista = response.calificaciones ?? [];

        this.calificaciones = lista.map((c: any) => ({
          curso: c.materia,
          promedio: c.promedioFinal,
          parcial1: c.parcial1,
          parcial2: c.parcial2,
          parcial3: c.parcial3,
        }));
      },
      error: (err) => {
        console.error('ERROR CALIFICACIONES ESTUDIANTE', err);
      },
    });
  }

  toNumber(value: any): number {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private bloqueParcial(nombre: string, p: any): string {
    const deberes = p?.deberes ?? 0;
    const examenes = p?.examenes ?? 0;
    const trabajos = p?.trabajosClase ?? 0;
    const proyectos = p?.proyectos ?? 0;
    const promedio = p?.promedio ?? 0;

    // SOLO tags simples (permitidos por el sanitizer del alert)
    return (
      `<b>${nombre}</b><br>` +
      `Deberes: ${deberes}<br>` +
      `Exámenes: ${examenes}<br>` +
      `Trabajos: ${trabajos}<br>` +
      `Proyectos: ${proyectos}<br>` +
      `<b>Promedio: ${promedio}</b><br><br>`
    );
  }

  async mostrarObservacion(nota: any) {
    const promedioFinal = nota.promedio ?? 0;

    const message =
      this.bloqueParcial('Parcial 1', nota.parcial1) +
      this.bloqueParcial('Parcial 2', nota.parcial2) +
      this.bloqueParcial('Parcial 3', nota.parcial3) +
      `<b>PROMEDIO FINAL: ${promedioFinal}</b>`;

    const alert = await this.alertController.create({
      header: nota.curso,
      message,
      cssClass: 'alert-notas',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
