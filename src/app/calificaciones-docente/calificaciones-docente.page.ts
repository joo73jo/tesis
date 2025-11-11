import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
  AlertController
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../core/supabase.service';

@Component({
  selector: 'app-calificaciones-docente',
  standalone: true,
  templateUrl: './calificaciones-docente.page.html',
  styleUrls: ['./calificaciones-docente.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonSearchbar
  ],
})
export class CalificacionesDocentePage implements OnInit {
  calificaciones: any[] = [];
  calificacionesFiltradas: any[] = [];
  materias: string[] = [];
  materiaSeleccionada = 'Todas las materias';
  busqueda = '';
  promedioCurso = 0;

  constructor(
    private supabase: SupabaseService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const sesion = this.supabase.getSession();
    const { usuario } = sesion;

    // Traer todas las calificaciones del docente
    const data = await this.supabase.getCalificacionesDocente(usuario.id);
    this.calificaciones = data;

    // Limpiar y agrupar materias únicas
    const materiasUnicas = [
      ...new Set(
        data
          .map((c) => (c.curso || '').trim())
          .filter((c) => c !== '')
      ),
    ];

    this.materias = ['Todas las materias', ...materiasUnicas];
    this.materiaSeleccionada = 'Todas las materias';

    console.log('Materias cargadas:', this.materias);

    this.filtrarCalificaciones();
  }

  filtrarCalificaciones() {
    this.calificacionesFiltradas = this.calificaciones.filter((c) => {
      const coincideMateria =
        this.materiaSeleccionada === 'Todas las materias'
          ? true
          : c.curso === this.materiaSeleccionada;

      const coincideBusqueda = `${c.estudiantes.nombres} ${c.estudiantes.apellidos}`
        .toLowerCase()
        .includes(this.busqueda.toLowerCase());

      return coincideMateria && coincideBusqueda;
    });

    // Calcular promedio del curso mostrado
    const promedios = this.calificacionesFiltradas.map((n) => Number(n.promedio));
    this.promedioCurso =
      promedios.length > 0
        ? Number((promedios.reduce((a, b) => a + b, 0) / promedios.length).toFixed(2))
        : 0;
  }

  async mostrarObservacion(nota: any) {
    const alert = await this.alertController.create({
      header: `${nota.estudiantes.nombres} ${nota.estudiantes.apellidos}`,
      message: nota.observacion || 'Sin observación registrada.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
