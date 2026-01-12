import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-perfil-docente',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton],
  templateUrl: './perfil-docente.page.html',
  styleUrls: ['./perfil-docente.page.scss'],
})
export class PerfilDocentePage implements OnInit {

  nombreCompleto = '';
  materias: string[] = [];

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.authService.cargarSesion();

    const u = this.authService.usuario;
    if (!u) return;

    this.nombreCompleto = `${u.nombre} ${u.apellido}`;
    this.materias = Array.isArray(u.materias) ? u.materias : [];
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
