import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  AlertController
} from '@ionic/angular/standalone';
import { SupabaseService } from '../core/supabase.service';

@Component({
  selector: 'app-calificaciones-estudiante',
  standalone: true,
  templateUrl: './calificaciones-estudiante.page.html',
  styleUrls: ['./calificaciones-estudiante.page.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard
  ],
})
export class CalificacionesEstudiantePage implements OnInit {
  calificaciones: any[] = [];
  nombreUsuario = '';

  constructor(
    private supabase: SupabaseService,
    private alertController: AlertController
  ) {}

  async ngOnInit() {
    const sesion = this.supabase.getSession();
    this.nombreUsuario = `${sesion.usuario.nombres} ${sesion.usuario.apellidos}`;

    this.calificaciones = await this.supabase.getCalificacionesEstudiante(sesion.usuario.id);
  }

  async mostrarObservacion(nota: any) {
    const alert = await this.alertController.create({
      header: nota.curso,
      message: nota.observacion || 'Sin observación registrada.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
