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
  selector: 'app-perfil-docente',
  standalone: true,
  templateUrl: './perfil-docente.page.html',
  styleUrls: ['./perfil-docente.page.scss'],
  imports: [CommonModule, IonContent, IonButton, IonCard, IonIcon],
})
export class PerfilDocentePage implements OnInit {
  nombreCompleto = '';
  especialidad = '';
  cursoAsignado = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  ngOnInit() {
    const sesion = this.supabase.getSession();
    const { usuario } = sesion;

    this.nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`;
    this.especialidad = usuario.especialidad;
    this.cursoAsignado = usuario.curso_asignado;
  }

  cerrarSesion() {
    this.supabase.logout();
    this.router.navigate(['/login']);
  }
}
