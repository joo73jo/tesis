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
  selector: 'app-perfil-estudiante',
  standalone: true,
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
  imports: [CommonModule, IonContent, IonButton, IonCard, IonIcon],
})
export class PerfilEstudiantePage implements OnInit {

  nombreCompleto = '';
  curso = '';
  paralelo = '';
  estado = '';
  promedioGeneral = 0;   // 👈 VARIABLE QUE FALTABA

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.authService.cargarSesion();

    const usuario = this.authService.usuario;
    if (!usuario) return;

    this.nombreCompleto = `${usuario.nombres} ${usuario.apellidos}`;
    this.curso = usuario.curso;
    this.paralelo = usuario.paralelo;
    this.estado = usuario.estado;

    // Por ahora queda en 0 hasta calcularlo desde calificaciones
    this.promedioGeneral = usuario.promedioGeneral ?? 0;
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
