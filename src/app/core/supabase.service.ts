import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private sesionActual: any = null;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  // ======================================
  // LOGIN GENERAL
  // ======================================
  async login(correo: string, contrasena: string) {
    // DOCENTE
    const { data: docente } = await this.supabase
      .from('docentes')
      .select('*')
      .eq('correo', correo)
      .eq('contrasena', contrasena)
      .maybeSingle();

    if (docente) return { rol: 'docente', usuario: docente };

    // ESTUDIANTE
    const { data: estudiante } = await this.supabase
      .from('estudiantes')
      .select('*')
      .eq('correo', correo)
      .eq('contrasena', contrasena)
      .maybeSingle();

    if (estudiante) return { rol: 'estudiante', usuario: estudiante };

    throw new Error('Credenciales inválidas');
  }

  // ======================================
  // SESIÓN LOCAL SIMPLE
  // ======================================
  setSession(session: any) {
    this.sesionActual = session;
  }

  getSession() {
    return this.sesionActual;
  }

  logout() {
    this.sesionActual = null;
  }

  // ======================================
  // CONSULTAS
  // ======================================

  // Calificaciones del estudiante logueado
  async getCalificacionesEstudiante(idEstudiante: number) {
    const { data, error } = await this.supabase
      .from('calificaciones')
      .select('id, curso, nota1, nota2, nota3, promedio, observacion')
      .eq('id_estudiante', idEstudiante);

    if (error) throw error;
    return data;
  }

  // Calificaciones de los estudiantes del docente logueado
  async getCalificacionesDocente(idDocente: number) {
    const { data, error } = await this.supabase
      .from('calificaciones')
      .select(`
        id,
        curso,
        nota1,
        nota2,
        nota3,
        promedio,
        observacion,
        estudiantes (id, nombres, apellidos, curso)
      `)
      .eq('id_docente', idDocente);

    if (error) throw error;
    return data;
  }
}
