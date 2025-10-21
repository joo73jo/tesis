import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'auth',  loadComponent: () => import('./auth/auth.page').then(m => m.AuthPage) },

  {
    path: 'tabs-estudiante',
    loadComponent: () => import('./tabs-estudiante/tabs-estudiante.page').then(m => m.TabsEstudiantePage),
    children: [
      { path: '', redirectTo: 'calificaciones', pathMatch: 'full' },
      { path: 'calificaciones', loadComponent: () => import('./calificaciones-estudiante/calificaciones-estudiante.page').then(m => m.CalificacionesEstudiantePage) },
      { path: 'perfil',         loadComponent: () => import('./perfil-estudiante/perfil-estudiante.page').then(m => m.PerfilEstudiantePage) },
      { path: 'noticias',       loadComponent: () => import('./noticias-estudiante/noticias-estudiante.page').then(m => m.NoticiasEstudiantePage) },
    ]
  },

  {
    path: 'tabs-docente',
    loadComponent: () => import('./tabs-docente/tabs-docente.page').then(m => m.TabsDocentePage),
    children: [
      { path: '', redirectTo: 'calificaciones', pathMatch: 'full' },
      { path: 'calificaciones', loadComponent: () => import('./calificaciones-docente/calificaciones-docente.page').then(m => m.CalificacionesDocentePage) },
      { path: 'perfil',         loadComponent: () => import('./perfil-docente/perfil-docente.page').then(m => m.PerfilDocentePage) },
      { path: 'noticias',       loadComponent: () => import('./noticias-docente/noticias-docente.page').then(m => m.NoticiasDocentePage) },
    ]
  },
];
