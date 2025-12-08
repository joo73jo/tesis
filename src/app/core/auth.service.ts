import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly BASE_URL = 'https://tesis-j3s3.onrender.com';

  usuario: any = null;
  token: string | null = null;

  constructor(private http: HttpClient) {}

  private jsonHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  // ========================================
  // LOGIN ESTUDIANTE
  // ========================================
  loginEstudiante(email: string, password: string) {
    return this.http.post(
      `${this.BASE_URL}/apiE/login`,
      { email, password },
      { headers: this.jsonHeaders }
    );
  }

  // ========================================
  // LOGIN DOCENTE
  // ========================================
  loginDocente(email: string, password: string) {
    return this.http.post(
      `${this.BASE_URL}/apiD/login`,
      { email, password },
      { headers: this.jsonHeaders }
    );
  }

  // ========================================
  // GUARDAR SESIÓN
  // ========================================
  async guardarSesion(data: any) {
    this.token = data.token;
    this.usuario = data;

    localStorage.setItem('usuario', JSON.stringify(data));
    localStorage.setItem('token', data.token);
  }

  async cargarSesion() {
    const u = localStorage.getItem('usuario');
    const t = localStorage.getItem('token');

    this.usuario = u ? JSON.parse(u) : null;
    this.token = t;
  }

  logout() {
    this.usuario = null;
    this.token = null;

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
  }

  // ========================================
  // HEADERS AUTORIZADOS
  // ========================================
  getHeaders() {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  obtenerCalificacionesEstudiante(id: string) {
    return this.http.get(`${this.BASE_URL}/apiE/calificaciones/${id}`, {
      headers: this.getHeaders()
    });
  }

  obtenerCalificacionesDocente(id: string) {
    return this.http.get(`${this.BASE_URL}/apiD/calificaciones/${id}`, {
      headers: this.getHeaders()
    });
  }
}
