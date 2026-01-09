import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonButton,
  IonCard,
  IonIcon
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.authService.cargarSesion();

    const usuario = this.authService.usuario;
    if (!usuario) return;

    this.nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`;
    this.especialidad = usuario.especialidad;
    this.cursoAsignado = usuario.curso_asignado;
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
