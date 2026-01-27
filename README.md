# SISTEMA-DE-GESTIÓN-ACADÉMICA-MÓVIL

## Descripción

Este proyecto corresponde al **Trabajo de Integración Curricular (TIC)** y consiste en el desarrollo de una **aplicación móvil multiplataforma** orientada a mejorar la gestión académica y comunicacional de la Unidad Educativa Intercultural Bilingüe **“Tránsito Amaguaña”**.

La aplicación permite a **estudiantes, padres de familia y docentes** acceder de forma segura a información académica relevante, como calificaciones, observaciones y noticias institucionales, optimizando los procesos de consulta y reduciendo la dependencia de medios manuales.

El sistema fue desarrollado utilizando **Ionic Framework con Angular 17 (arquitectura standalone)** e integrado con servicios en la nube para autenticación y gestión de datos.

---

## Características principales

### Roles del sistema

* **Estudiante / Padre de familia**

  * Consulta de calificaciones académicas.
  * Visualización de observaciones emitidas por los docentes.
  * Acceso a noticias e información institucional.
  * Visualización del perfil del estudiante.

* **Docente**

  * Consulta de cursos asignados.
  * Visualización de calificaciones por curso.
  * Registro y visualización de observaciones académicas.
  * Acceso a noticias institucionales.
  * Gestión de su perfil.

---

### Gestión académica

* Autenticación de usuarios mediante credenciales seguras.
* Acceso diferenciado según el rol del usuario.
* Visualización de información académica en tiempo real.
* Interfaz intuitiva y adaptable a dispositivos móviles Android.

---

### Tecnologías utilizadas

* **Ionic Framework**
* **Angular 17 (Standalone Components)**
* **TypeScript**
* **Firebase Authentication**
* **Firebase Firestore**
* **Capacitor**
* **Android Studio**

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrese de contar con lo siguiente instalado:

* Node.js (versión recomendada 18 o superior)
* Ionic CLI

  ```bash
  npm install -g @ionic/cli
  ```
* Angular CLI

  ```bash
  npm install -g @angular/cli
  ```
* Android Studio (para compilación y ejecución en Android)
* JDK 17
---

## Inicialización del proyecto

### Clonar el repositorio

```bash
git clone https://github.com/joo73jo/tesis.git
```

### Acceder al directorio del proyecto

```bash
cd tesis
```

### Instalar dependencias

```bash
npm install
```
---

## Ejecución del proyecto

### Ejecutar en navegador (modo desarrollo)

```bash
ionic serve
```

### Compilar y ejecutar en Android

```bash
ionic build
ionic cap add android
ionic cap sync
ionic cap open android
```

Desde Android Studio, ejecutar el proyecto en un emulador o dispositivo físico.

---

## Estructura general del proyecto

```
src/app/
│── auth/
│── login/
│── home/
│── core/
│
├── tabs-docente/
│   ├── perfil-docente/
│   ├── noticias-docente/
│   └── calificaciones-docente/
│
├── tabs-estudiante/
│   ├── perfil-estudiante/
│   ├── noticias-estudiante/
│   └── calificaciones-estudiante/
│
└── app.routes.ts
```

El enrutamiento se gestiona mediante `app.routes.ts` utilizando **Angular Standalone Routing**.

---

## Pruebas realizadas

* Pruebas funcionales por rol (docente y estudiante).
* Pruebas de compatibilidad en dispositivos Android.
* Validación de autenticación y permisos de acceso.
* Pruebas de rendimiento básico y estabilidad de la aplicación.

---

## Autor

**Joel Parra**
Carrera de Desarrollo en Software
Trabajo de Integración Curricular


