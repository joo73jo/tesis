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

Documentación
Autenticación
Inicio de sesión

Vista: Login

Ruta: /login

Método: Interfaz

Autenticación: No requerida

Descripción: Permite autenticar al usuario y determinar su rol de acceso.

Campos requeridos:

email (String): Correo electrónico

password (String): Contraseña

Ejemplo de entrada:

{
  "email": "docente@institucion.edu.ec",
  "password": "Docente123"
}

Gestión de Estudiantes / Padres de Familia
Acceso al panel principal

Vista: Tabs Estudiante

Ruta: /tabs-estudiante

Método: Navegación

Autenticación: Requerida

Descripción: Contenedor principal de funcionalidades del estudiante o padre de familia.

Consultar calificaciones del estudiante

Vista: Calificaciones Estudiante

Ruta: /tabs-estudiante/calificaciones

Método: Visualización

Autenticación: Requerida

Descripción: Permite visualizar las calificaciones académicas del estudiante.

Datos mostrados:

materia (String)

promedio (Number)

estado (String)

Ejemplo de datos mostrados:

[
  {
    "materia": "Matemáticas",
    "promedio": 15.5,
    "estado": "Aprobado"
  },
  {
    "materia": "Lengua y Literatura",
    "promedio": 13.2,
    "estado": "Aprobado"
  }
]

Ver observaciones académicas

Vista: Detalle de Observaciones

Ruta: /tabs-estudiante/calificaciones/:id

Método: Visualización

Autenticación: Requerida

Descripción: Muestra las observaciones registradas por el docente.

Parámetros de ruta:

id (String): Identificador de la materia

Ejemplo de datos mostrados:

{
  "materia": "Matemáticas",
  "observacion": "Debe reforzar operaciones con fracciones.",
  "docente": "Ing. Juan Pérez"
}

Información institucional y noticias

(Estudiante / Padre de familia)

Acceso a información institucional

Vista: Información Institucional

Ruta: /tabs-estudiante/noticias

Método: Navegación

Autenticación: Requerida

Descripción: Proporciona enlaces externos a la información institucional publicada en la página web oficial.

Enlaces disponibles:

vision (URL): Enlace a la visión institucional

mision (URL): Enlace a la misión institucional

historia (URL): Enlace a información general de la institución

Ejemplo de enlaces:

{
  "vision": "https://www.institucion.edu.ec/vision",
  "mision": "https://www.institucion.edu.ec/mision",
  "historia": "https://www.institucion.edu.ec/quienes-somos"
}

Acceso a noticia principal

Vista: Noticia Principal

Ruta: /tabs-estudiante/noticias

Método: Navegación

Autenticación: Requerida

Descripción: Muestra un acceso directo a la noticia principal publicada en el sitio web institucional.

Datos disponibles:

titulo (String)

url (URL): Enlace externo a la noticia completa

Ejemplo de enlace:

{
  "titulo": "Comunicado institucional",
  "url": "https://www.institucion.edu.ec/noticias/comunicado-principal"
}

Redirección a sitio web institucional

Tipo: Enlace externo

Descripción: Redirige al usuario al navegador del dispositivo para visualizar el contenido completo en la web institucional.

Ejemplo de flujo:

Usuario selecciona enlace → Apertura de navegador → Sitio web institucional

Perfil del estudiante

Vista: Perfil Estudiante

Ruta: /tabs-estudiante/perfil

Método: Visualización

Autenticación: Requerida

Descripción: Muestra la información básica del estudiante.

Ejemplo de datos mostrados:

{
  "nombre": "Carlos Rodríguez",
  "rol": "Estudiante",
  "curso": "Tercero de Bachillerato"
}

Gestión de Docentes
Acceso al panel principal

Vista: Tabs Docente

Ruta: /tabs-docente

Método: Navegación

Autenticación: Requerida

Descripción: Contenedor principal de funcionalidades del docente.

Consultar calificaciones por curso

Vista: Calificaciones Docente

Ruta: /tabs-docente/calificaciones

Método: Visualización

Autenticación: Requerida

Descripción: Permite visualizar calificaciones organizadas por curso.

Ejemplo de datos mostrados:

{
  "curso": "Segundo de Bachillerato",
  "estudiantes": [
    {
      "nombre": "María Gómez",
      "promedio": 16.8
    },
    {
      "nombre": "Luis Andrade",
      "promedio": 14.1
    }
  ]
}

Perfil del docente

Vista: Perfil Docente

Ruta: /tabs-docente/perfil

Método: Visualización

Autenticación: Requerida

Descripción: Muestra la información básica del docente.

Ejemplo de datos mostrados:

{
  "nombre": "Juan Pérez",
  "rol": "Docente",
  "materia": "Matemáticas"
}

Control de acceso

Tipo: Lógico

Autenticación: Requerida

Descripción: Restringe el acceso a vistas según el rol del usuario.

Ejemplo de validación de rol:

{
  "usuario": "docente@institucion.edu.ec",
  "rol": "Docente",
  "accesoPermitido": true
}

Flujo general del sistema
Login → Validación → Identificación de rol → Redirección → Uso de funcionalidades

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


