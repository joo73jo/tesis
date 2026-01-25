import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-perfil-estudiante',
  standalone: true,
  imports: [CommonModule, IonContent, IonButton],
  templateUrl: './perfil-estudiante.page.html',
  styleUrls: ['./perfil-estudiante.page.scss'],
})
export class PerfilEstudiantePage implements OnInit {

  nombreCompleto = '';
  curso = '';
  promedioGeneral = 0;
  rendimiento = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.authService.cargarSesion();

    const sesion = this.authService.usuario;
    if (!sesion) return;

    const u = sesion.usuario ?? sesion;

    this.nombreCompleto = `${u.nombre ?? ''} ${u.apellido ?? ''}`.trim();
    this.curso = u.curso ?? '';

    this.calcularPromedioGeneral(u._id);
  }

  calcularPromedioGeneral(estudianteId: string) {
    this.authService.obtenerCalificacionesEstudiante(estudianteId).subscribe({
      next: (response: any) => {
        const calificaciones = response.calificaciones ?? [];

        const promedios: number[] = calificaciones
          .map((c: any) => Number(c.promedioFinal))
          .filter((p: number) => Number.isFinite(p) && p > 0);

        if (promedios.length === 0) {
          this.promedioGeneral = 0;
          this.rendimiento = 'SIN EVALUACIONES REGISTRADAS';
          return;
        }

        const suma = promedios.reduce(
          (a: number, b: number) => a + b,
          0
        );

        this.promedioGeneral = Number(
          (suma / promedios.length).toFixed(2)
        );

        if (this.promedioGeneral < 14) {
          this.rendimiento = 'NECESITA REFUERZO ACADÉMICO';
        } else if (this.promedioGeneral < 18) {
          this.rendimiento = 'RENDIMIENTO ADECUADO';
        } else {
          this.rendimiento = 'RENDIMIENTO DESTACADO';
        }
      },
      error: () => {
        this.promedioGeneral = 0;
        this.rendimiento = 'NO DISPONIBLE';
      },
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
