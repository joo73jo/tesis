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

type Estudiante = {
  _id: string;
  nombre: string;
  apellido: string;
  curso?: string;
};

type MateriaNota = {
  curso: string;
  promedio: number;
};

type EstudianteNotas = {
  estudiante: Estudiante;
  materias: MateriaNota[];
};

type CalificacionApi = {
  estudiante: Estudiante;
  docente: any;
  materia: string;
  promedioFinal: number;
};

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

  materiaSeleccionada = 'Todas las materias';
  busqueda = '';

  estudiantes: EstudianteNotas[] = [];
  estudiantesFiltrados: EstudianteNotas[] = [];
  materiasDisponibles: string[] = ['Todas las materias'];

  constructor(private authService: AuthService) {}

  async ngOnInit() {
    await this.authService.cargarSesion();
    const usuario = this.authService.usuario;
    if (!usuario) return;

    this.authService.obtenerCalificacionesDocente(usuario._id)
      .subscribe({
        next: (data: CalificacionApi[]) => {

          const mapa = new Map<string, EstudianteNotas>();
          const materiasSet = new Set<string>();

          data.forEach(c => {
            if (!c.estudiante || !c.estudiante._id) return;

            const promedio = Number(c.promedioFinal);
            if (isNaN(promedio)) return;

            const estudianteId = c.estudiante._id;
            const materia = c.materia;

            materiasSet.add(materia);

            if (!mapa.has(estudianteId)) {
              mapa.set(estudianteId, {
                estudiante: {
                  _id: estudianteId,
                  nombre: c.estudiante.nombre,
                  apellido: c.estudiante.apellido,
                  curso: c.estudiante.curso
                },
                materias: []
              });
            }

            mapa.get(estudianteId)!.materias.push({
              curso: materia,
              promedio: Number(promedio.toFixed(2))
            });
          });

          this.estudiantes = Array.from(mapa.values()).map(e => ({
            ...e,
            materias: e.materias.sort((a, b) =>
              a.curso.localeCompare(b.curso)
            )
          }));

          this.materiasDisponibles = [
            'Todas las materias',
            ...Array.from(materiasSet).sort()
          ];

          this.filtrar();
        },
        error: err => {
          console.error('Error al obtener calificaciones', err);
          this.estudiantes = [];
          this.estudiantesFiltrados = [];
        }
      });
  }

  filtrar() {
    const texto = this.busqueda.trim().toLowerCase();

    this.estudiantesFiltrados = this.estudiantes
      .map(e => {
        const materiasFiltradas = e.materias.filter(m =>
          this.materiaSeleccionada === 'Todas las materias' ||
          m.curso === this.materiaSeleccionada
        );
        return { ...e, materias: materiasFiltradas };
      })
      .filter(e => {
        const nombreCompleto =
          `${e.estudiante.nombre} ${e.estudiante.apellido}`.toLowerCase();
        return (
          (!texto || nombreCompleto.includes(texto)) &&
          e.materias.length > 0
        );
      });
  }
}
