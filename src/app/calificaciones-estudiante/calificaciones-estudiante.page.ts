import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, NgFor } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { CalificacionesEstudianteService, Calificacion } from './calificaciones-estudiante.service';

@Component({
  selector: 'app-calificaciones-estudiante',
  templateUrl: './calificaciones-estudiante.page.html',
  styleUrls: ['./calificaciones-estudiante.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, NgFor, DecimalPipe]
})
export class CalificacionesEstudiantePage implements OnInit {

  calificaciones: Calificacion[] = [];
  promedio = 0;

  constructor(
    private calificacionesService: CalificacionesEstudianteService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.calificaciones = this.calificacionesService.getCalificaciones();
    this.promedio = this.calificaciones.reduce((acc, n) => acc + n.nota, 0) / this.calificaciones.length;
  }

  get tieneReprobadas(): boolean {
    return this.calificaciones.some(n => n.nota < 7);
  }

  async mostrarObservacion(c: Calificacion) {
    const alert = await this.alertCtrl.create({
      header: c.materia,
      message: `Nota: ${c.nota}\n\n${c.observacion}`,
      buttons: ['Cerrar'],
      cssClass: 'alert-custom'
    });
    await alert.present();
  }

async mostrarObservacionGeneral() {
  const reprobadas = this.calificaciones.filter(n => n.nota < 7);
  const listado = reprobadas.map(n => `${n.materia} (${n.nota})`).join(', ');

  const alert = await this.alertCtrl.create({
    header: 'Observación General',
    message: `Promedio: ${this.promedio.toFixed(1)}\n\nMaterias reprobadas: ${listado}\n\nDebe mejorar su rendimiento académico general. Revise las materias con calificaciones bajas.`,
    buttons: ['Cerrar'],
    cssClass: 'alert-custom'
  });
  await alert.present();
}

}