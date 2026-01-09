import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesEstudianteService {

  constructor(private http: HttpClient) {}

  getCalificacionesEstudiante(estudianteId: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiUrl}/estudiante/calificaciones/${estudianteId}`,
      { withCredentials: true }
    );
  }
}
