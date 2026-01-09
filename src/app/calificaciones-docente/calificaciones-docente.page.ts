import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
  IonList
} from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-calificaciones-docente',
  standalone: true,
  templateUrl: './calificaciones-docente.page.html',
  styleUrls: ['./calificaciones-docente.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonSearchbar,
    IonList
  ],
})
export class CalificacionesDocentePage implements OnInit {

  materias: string[] = [];
  materiaSeleccionada = 'Todas las materias';
  busqueda = '';

  calificaciones: any[] = [];
  calificacionesFiltradas: any[] = [];
  promedioCurso = 0;

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.cargarSesion();
    const usuario = this.authService.usuario;
    if (!usuario) return;

    this.authService.obtenerCalificacionesDocente(usuario._id)
      .subscribe({
        next: (data: any[]) => {
          this.calificaciones = data.map((c: any) => ({
            estudiantes: c.estudiante,
            curso: c.materia,
            promedio: c.promedioFinal
          }));

          this.materias = [
            'Todas las materias',
            ...new Set(this.calificaciones.map(c => c.curso))
          ];

          this.filtrarCalificaciones();
        },
        error: () => {}
      });
  }

  filtrarCalificaciones() {
    this.calificacionesFiltradas = this.calificaciones.filter(c => {
      const coincideMateria =
        this.materiaSeleccionada === 'Todas las materias' ||
        c.curso === this.materiaSeleccionada;

      const coincideBusqueda =
        !this.busqueda ||
        `${c.estudiantes.nombres} ${c.estudiantes.apellidos}`
          .toLowerCase()
          .includes(this.busqueda.toLowerCase());

      return coincideMateria && coincideBusqueda;
    });

    if (this.calificacionesFiltradas.length > 0) {
      const suma = this.calificacionesFiltradas.reduce(
        (acc, c) => acc + c.promedio, 0
      );
      this.promedioCurso = Number(
        (suma / this.calificacionesFiltradas.length).toFixed(2)
      );
    } else {
      this.promedioCurso = 0;
    }
  }

  mostrarObservacion(nota: any) {
    // Se deja porque el HTML la usa
  }
}
