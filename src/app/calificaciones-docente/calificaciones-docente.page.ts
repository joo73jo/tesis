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
  IonList,
  AlertController
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

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController
  ) {}

  async ngOnInit() {
    await this.authService.cargarSesion();
    const usuario = this.authService.usuario;
    if (!usuario) return;

    this.authService.obtenerCalificacionesDocente(usuario._id)
      .subscribe(data => {

        const mapa = new Map<string, EstudianteNotas>();
        const materiasSet = new Set<string>();

        data.forEach(c => {
          if (!c.estudiante?._id) return;

          const promedio = Number(c.promedioFinal);
          if (isNaN(promedio)) return;

          materiasSet.add(c.materia);

          if (!mapa.has(c.estudiante._id)) {
            mapa.set(c.estudiante._id, {
              estudiante: {
                _id: c.estudiante._id,
                nombre: c.estudiante.nombre,
                apellido: c.estudiante.apellido,
                curso: c.estudiante.curso
              },
              materias: []
            });
          }

          mapa.get(c.estudiante._id)!.materias.push({
            curso: c.materia,
            promedio: Number(promedio.toFixed(2))
          });
        });

        this.estudiantes = Array.from(mapa.values());
        this.materiasDisponibles = [
          'Todas las materias',
          ...Array.from(materiasSet).sort()
        ];

        this.filtrar();
      });
  }

  filtrar() {
    const texto = this.busqueda.toLowerCase().trim();

    this.estudiantesFiltrados = this.estudiantes
      .map(e => ({
        ...e,
        materias: e.materias.filter(m =>
          this.materiaSeleccionada === 'Todas las materias' ||
          m.curso === this.materiaSeleccionada
        )
      }))
      .filter(e =>
        (`${e.estudiante.nombre} ${e.estudiante.apellido}`
          .toLowerCase()
          .includes(texto)) &&
        e.materias.length > 0
      );
  }

  async verResumen(e: EstudianteNotas) {
    const notas = e.materias.map(m => m.promedio);
    const promedio =
      notas.reduce((a, b) => a + b, 0) / notas.length;

    const mejor = e.materias.reduce((a, b) =>
      b.promedio > a.promedio ? b : a
    );

    const peor = e.materias.reduce((a, b) =>
      b.promedio < a.promedio ? b : a
    );

    const evaluacion = this.evaluar(promedio);

    const mensaje =
      `Mejor materia: ${mejor.curso} (${mejor.promedio})\n` +
      `Materia más baja: ${peor.curso} (${peor.promedio})\n\n` +
      `Evaluación:\n${evaluacion}`;

    const alert = await this.alertCtrl.create({
      header: `${e.estudiante.nombre} ${e.estudiante.apellido}`,
      subHeader: `Promedio general: ${promedio.toFixed(2)} / 20`,
      message: mensaje,
      buttons: ['CERRAR']
    });

    await alert.present();
  }

  evaluar(nota: number): string {
    if (nota >= 19) return 'Excelente estudiante, no necesita apoyo.';
    if (nota >= 18) return 'Muy buen rendimiento, fallos mínimos.';
    if (nota >= 14) return 'Buen rendimiento, puede mejorar.';
    if (nota >= 11) return 'Rendimiento medio, requiere refuerzo.';
    if (nota >= 7) return 'Bajo rendimiento, necesita apoyo.';
    return 'Rendimiento crítico, intervención urgente.';
  }
}
