import { Injectable } from '@angular/core';

export interface Calificacion {
  id: number;
  materia: string;
  nota: number;
  observacion: string;
}

@Injectable({ providedIn: 'root' })
export class CalificacionesEstudianteService {

  private calificaciones: Calificacion[] = [
    { id: 1, materia: 'Matemáticas', nota: 9.8, observacion: 'Excelente razonamiento lógico.' },
    { id: 2, materia: 'Lengua', nota: 4.0, observacion: 'Debe mejorar en ortografía y redacción.' },
    { id: 3, materia: 'Ciencias Naturales', nota: 6.3, observacion: 'Le falta participar más en clase.' },
    { id: 4, materia: 'Historia', nota: 2.0, observacion: 'No entregó tareas ni asistió regularmente.' },
    { id: 5, materia: 'Arte', nota: 10, observacion: 'Gran creatividad y responsabilidad.' }
  ];

  getCalificaciones() {
    return this.calificaciones;
  }
}
