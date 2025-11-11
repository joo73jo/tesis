import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonCard,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { SupabaseService } from '../core/supabase.service';

@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
  imports: [CommonModule, IonContent, IonButton, IonCard, IonIcon],
})
export class PerfilEstudiantePage implements OnInit {
  nombreCompleto = '';
  curso = '';
  promedioGeneral = 0;
  estado = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

async ngOnInit() {
  const sesion = this.supabase.getSession();
  const { usuario } = sesion;

  this.nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`;
  this.curso = usuario.curso;

  const calificaciones = await this.supabase.getCalificacionesEstudiante(usuario.id);
  const promedios = calificaciones.map(c => Number(c.promedio));

  if (promedios.length > 0) {
    const promedio = promedios.reduce((a, b) => a + b, 0) / promedios.length;
    this.promedioGeneral = Number(promedio.toFixed(2)); // ✅ convierte a número
  } else {
    this.promedioGeneral = 0;
  }

  this.estado = this.promedioGeneral >= 7 ? 'APRUEBA' : 'REPRUEBA';
}


  cerrarSesion() {
    this.supabase.logout();
    this.router.navigate(['/login']);
  }
}
