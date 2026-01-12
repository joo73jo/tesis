import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton } from '@ionic/angular/standalone';

type UltimaNoticia = {
  titulo: string;
  fecha: string;
  resumen: string;
  imagen: string;
};

@Component({
  selector: 'app-noticias-estudiante',
  standalone: true,
  templateUrl: './noticias-estudiante.page.html',
  styleUrls: ['./noticias-estudiante.page.scss'],
  imports: [CommonModule, IonContent, IonButton],
})
export class NoticiasEstudiantePage {

  // URLs oficiales (MISMAS que docente)
  urlMision = 'https://tesis-frontend-three.vercel.app/informacion';
  urlVision = 'https://tesis-frontend-three.vercel.app/informacion';
  urlSobreNosotros = 'https://tesis-frontend-three.vercel.app/sobre-nosotros';
  urlNoticias = 'https://tesis-frontend-three.vercel.app/noticias';

  // ÚLTIMA NOTICIA (MISMA IMAGEN QUE DOCENTE)
  ultimaNoticia: UltimaNoticia = {
    titulo: 'Noticias y Eventos Institucionales',
    fecha: 'Actualizado recientemente',
    resumen:
      'Consulta la última información institucional, actividades y eventos publicados por la Unidad Educativa.',
    imagen:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=60',
  };

  abrir(url: string) {
    window.open(url, '_blank');
  }
}
