import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonFooter,
  ModalController,
} from '@ionic/angular/standalone';
import { AuthService } from '../core/auth.service';

/* ======================================================
   MODAL INLINE
   ====================================================== */
@Component({
  selector: 'app-calificacion-modal-inline',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonFooter,
  ],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title class="titulo">{{ curso }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="comentario" [class.reprobado]="reprobadoFinal">
        {{ comentario }}
      </div>

      <div
        class="bloque"
        *ngIf="parcial1"
        [class.reprobado]="parcial1.promedio < 14"
      >
        <div class="bloque-titulo">Parcial 1</div>
        <div class="fila"><span>Deberes</span><span>{{ parcial1.deberes }}</span></div>
        <div class="fila"><span>Exámenes</span><span>{{ parcial1.examenes }}</span></div>
        <div class="fila"><span>Trabajos</span><span>{{ parcial1.trabajosClase }}</span></div>
        <div class="fila"><span>Proyectos</span><span>{{ parcial1.proyectos }}</span></div>
        <div class="promedio">Promedio: {{ parcial1.promedio }}</div>
      </div>

      <div
        class="bloque"
        *ngIf="parcial2"
        [class.reprobado]="parcial2.promedio < 14"
      >
        <div class="bloque-titulo">Parcial 2</div>
        <div class="fila"><span>Deberes</span><span>{{ parcial2.deberes }}</span></div>
        <div class="fila"><span>Exámenes</span><span>{{ parcial2.examenes }}</span></div>
        <div class="fila"><span>Trabajos</span><span>{{ parcial2.trabajosClase }}</span></div>
        <div class="fila"><span>Proyectos</span><span>{{ parcial2.proyectos }}</span></div>
        <div class="promedio">Promedio: {{ parcial2.promedio }}</div>
      </div>

      <div
        class="bloque"
        *ngIf="parcial3"
        [class.reprobado]="parcial3.promedio < 14"
      >
        <div class="bloque-titulo">Parcial 3</div>
        <div class="fila"><span>Deberes</span><span>{{ parcial3.deberes }}</span></div>
        <div class="fila"><span>Exámenes</span><span>{{ parcial3.examenes }}</span></div>
        <div class="fila"><span>Trabajos</span><span>{{ parcial3.trabajosClase }}</span></div>
        <div class="fila"><span>Proyectos</span><span>{{ parcial3.proyectos }}</span></div>
        <div class="promedio">Promedio: {{ parcial3.promedio }}</div>
      </div>

      <div class="final" [class.reprobado]="reprobadoFinal">
        🎯 Promedio Final: {{ promedioFinal }}
      </div>
    </ion-content>

    <ion-footer class="ion-padding">
      <ion-button expand="block" (click)="cerrar()">OK</ion-button>
    </ion-footer>
  `,
  styles: [`
    ion-toolbar {
      --background: linear-gradient(180deg, #0b0f1a 0%, #060914 100%);
      --color: #e5e7eb;
    }

    ion-content {
      --background: linear-gradient(180deg, #0b0f1a 0%, #060914 100%);
      color: #e5e7eb;
    }

    .titulo {
      text-align: center;
      width: 100%;
      font-weight: 800;
    }

    .comentario {
      text-align: center;
      font-weight: 900;
      margin: 12px 0 18px;
    }

    .comentario.reprobado {
      color: #ef4444;
    }

    .bloque {
      margin: 14px 0;
      padding: 14px;
      border-radius: 16px;
      background: rgba(255,255,255,0.03);
      border: 1.5px solid rgba(255,255,255,0.15);
    }

    .bloque.reprobado {
      border-color: rgba(239,68,68,0.75);
      box-shadow: 0 0 12px rgba(239,68,68,0.18);
    }

    .bloque-titulo {
      font-weight: 900;
      margin-bottom: 12px;
      text-align: center;
    }

    .fila {
      display: flex;
      justify-content: space-between;
      margin: 6px 0;
      color: #d1d5db;
    }

    .fila span:last-child {
      font-weight: 700;
      color: #f3f4f6;
    }

    .promedio {
      margin-top: 12px;
      font-weight: 900;
      text-align: center;
    }

    .final {
      margin: 20px 0 10px;
      font-weight: 900;
      text-align: center;
      font-size: 1.1rem;
      color: #93c5fd;
    }

    .final.reprobado {
      color: #ef4444;
    }

    ion-button {
      --background: #ef4444;
      --border-radius: 14px;
      font-weight: 800;
    }
  `],
})
class CalificacionModalInlineComponent {
  @Input() curso = '';
  @Input() comentario = '';
  @Input() promedioFinal = 0;
  @Input() reprobadoFinal = false;
  @Input() parcial1: any = null;
  @Input() parcial2: any = null;
  @Input() parcial3: any = null;

  constructor(private modalCtrl: ModalController) {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}

/* ======================================================
   PAGE
   ====================================================== */
@Component({
  selector: 'app-calificaciones-estudiante',
  standalone: true,
  templateUrl: './calificaciones-estudiante.page.html',
  styleUrls: ['./calificaciones-estudiante.page.scss'],
  imports: [CommonModule, IonContent, IonGrid, IonRow, IonCol, IonCard],
})
export class CalificacionesEstudiantePage {
  calificaciones: any[] = [];
  nombreUsuario = '';

  constructor(
    private authService: AuthService,
    private modalController: ModalController
  ) {}

  async ionViewWillEnter() {
    await this.authService.cargarSesion();

    const sesion = this.authService.usuario;
    if (!sesion) return;

    const usuario = sesion.usuario ?? sesion;
    this.nombreUsuario = `${usuario.nombre} ${usuario.apellido}`;

    this.authService.obtenerCalificacionesEstudiante(usuario._id).subscribe({
      next: (response: any) => {
        const lista = response.calificaciones ?? [];
        this.calificaciones = lista.map((c: any) => ({
          curso: c.materia,
          promedio: c.promedioFinal,
          parcial1: c.parcial1,
          parcial2: c.parcial2,
          parcial3: c.parcial3,
        }));
      },
      error: (err) => console.error(err),
    });
  }

  toNumber(v: any): number {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  private comentarioProfesor(promedio: number): string {
    if (promedio < 14) return '⚠️ NECESITA REFUERZO ACADÉMICO';
    if (promedio < 16) return 'DESEMPEÑO ACEPTABLE';
    if (promedio < 18) return 'BUEN DESEMPEÑO';
    return 'EXCELENTE DESEMPEÑO';
  }

  async mostrarObservacion(nota: any) {
    const promedioFinal = this.toNumber(nota.promedio);

    const modal = await this.modalController.create({
      component: CalificacionModalInlineComponent,
      componentProps: {
        curso: nota.curso,
        comentario: this.comentarioProfesor(promedioFinal),
        promedioFinal,
        reprobadoFinal: promedioFinal < 14,
        parcial1: nota.parcial1,
        parcial2: nota.parcial2,
        parcial3: nota.parcial3,
      },
    });

    await modal.present();
  }
}
