# Explicación de Componentes - fanger.design.web

Este documento describe la estructura y el propósito de cada componente en el proyecto para facilitar su escalabilidad y mantenimiento.

## 🏗️ Arquitectura Core

El proyecto está construido sobre:

- **Next.js 14+ (App Router)**: Estructura moderna de ruteo y renderizado.
- **Framer Motion**: Motor de animaciones de alto rendimiento.
- **Lenis**: Para scroll suave y elástico (smooth scroll).
- **Tailwind CSS**: Estilizado mediante utilidades y variables de diseño.

---

## 🌍 Componentes Globales

### `Header.tsx`

- **Función**: Barra de navegación superior persistente.
- **Características**:
  - Logo animado letra por letra (`FANGER`).
  - Navegación centrada en desktop, menú hamburguesa en mobile.
  - Menú overlay a pantalla completa con animaciones de desenfoque (blur).
  - Integración con `useLanguage` para bilingüismo.

### `Footer.tsx`

- **Función**: Pie de página con enlaces y créditos.
- **Características**:
  - Sección de cierre con tipografía masiva.
  - Redes sociales con efectos de hover.
  - Copyright dinámico por idioma.

### `Cursor.tsx`

- **Función**: Cursor personalizado que sigue al mouse.
- **Características**:
  - Usa `mix-blend-difference` para ser visible sobre cualquier color de fondo.
  - Se desactiva automáticamente en dispositivos táctiles mediante el hook `useCursor`.

### `SmoothScrollProvider.tsx`

- **Función**: Wrapper global que inicializa Lenis.
- **Características**:
  - Controla la suavidad del scroll en toda la aplicación.
  - Configurado con desaceleración progresiva para un feeling premium.

### `LanguageToggle.tsx`

- **Función**: Selector de idioma (ES/EN).
- **Características**:
  - Cambia el estado global de idioma a través de `useLanguage`.

---

## 🏠 Componentes de la Home (Sections)

### `NewHero.tsx`

- **Función**: Primera impresión visual de la web.
- **Características**:
  - Tipografía responsive masiva.
  - Imágenes "Polaroid" flotantes integradas directamente en el texto mediante Flexbox.
  - Sección inferior con imagen redondeada y texto parallax que se mueve con el scroll.

### `WorkCategories.tsx`

- **Función**: Muestra las áreas de especialización de la agencia.
- **Características**:
  - Texto "Marquee" animado en el fondo (`infinite loop`).
  - Layout alternado (imagen a la izquierda/derecha).
  - Efecto de zoom suave en las imágenes al hacer hover.

### `PinnedScrollSection.tsx`

- **Función**: Sección de alto impacto visual con scroll "Sticky".
- **Características**:
  - El lado izquierdo (Texto/Título) permanece fijo ("pinned") mientras el lado derecho (Imágenes) se desplaza verticalmente.
  - Usa `useTransform` para vincular la opacidad y posición de las imágenes directamente al progreso del scroll.

### `WorkShowcase.tsx`

- **Función**: Galería de proyectos destacados.
- **Características**:
  - Grid de 2 columnas con tarjetas de proyecto.
  - Animaciones de entrada con blur para un efecto de "revelado" elegante.

### `Clients.tsx`

- **Función**: Logotipos de clientes y marcas asociadas.
- **Características**:
  - Grid contenido dentro de un marco con esquinas decorativas SVG personalizadas.
  - Efecto de escala y remoción de escala de grises en hover.

### `CTASection.tsx`

- **Función**: Sección de suscripción al newsletter ("Etcetera").
- **Características**:
  - Título masivo con blur reveal.
  - Formulario de contacto estilizado con animaciones de foco premium.

---

## 📜 Otros Componentes Relevantes

### `Manifesto.tsx`

- **Función**: Sección de mensaje de marca (inspirada en weareexample).
- **Características**:
  - Títulos que se mueven con parallax.
  - Imágenes pequeñas insertadas dentro de las frases.

### `AnimatedSection.tsx`

- **Función**: Componente utilitario para animar cualquier contenido al entrar en el viewport.
- **Características**:
  - Acepta `delay` como prop para crear secuencias de aparición.

---

## 🛠️ Cómo Escalar el Proyecto

1.  **Añadir Nuevas Secciones**:

    - Crear el componente en `/components`.
    - Usar `framer-motion` para mantener la coherencia visual.
    - Importarlo en `app/page.tsx`.

2.  **Gestionar Contenido**:

    - Los datos de textos están en `data/i18n`. Para añadir un texto, actualiza `en.ts` y `es.ts`.
    - Las imágenes usan el componente `Image` de Next.js para optimización automática.

3.  **Estilos Globales**:
    - Modificar `app/globals.css` para cambiar tokens de diseño (colores, fuentes, curvas de animación).

---

## 📂 Organización de Carpetas

### `/data`

- **Propósito**: Almacena información estática y configuraciones de contenido que no necesitan lógica de componentes.
- **Archivos Clave**:
  - `i18n/en.ts` y `i18n/es.ts`: Diccionarios de traducción. Escalar aquí permite añadir nuevos idiomas sin tocar el JSX.
  - `clients.ts`: Lista centralizada de clientes y sus logotipos.
  - `navigation.ts`: Estructura de los menús de navegación.

### `/hooks`

- **Propósito**: Lógica de React reutilizable y gestión de estado.
- **Archivos Clave**:
  - `use-language.ts`: Utiliza **Zustand** con persistencia para recordar la preferencia de idioma del usuario.
  - `use-cursor.ts`: Lógica para el seguimiento del mouse y detección de touch.
  - `use-mobile.ts`: Hook sencillo para detectar cambios en el tamaño de ventana (breakpoints).

### `/lib`

- **Propósito**: Funciones de utilidad pura y configuraciones de librerías externas.
- **Archivos Clave**:
  - `utils.ts`: Contiene la función `cn`, esencial para fusionar clases de Tailwind de forma condicional y limpia.

### `/app`

- **Propósito**: Routing, Layouts y estilos globales (Next.js App Router).
- **Archivos Clave**:
  - `layout.tsx`: El "esqueleto" del sitio. Aquí se envuelve la app en proveedores y se definen los metadatos SEO.
  - `globals.css`: Donde vive el diseño atómico (variables, animaciones custom y resets).
  - `page.tsx`: Ensamblaje de la página principal.

### `/styles`

- **Propósito**: Archivos CSS adicionales o legados. En este proyecto, la mayoría de la lógica de estilos se centraliza en `/app/globals.css`, pero esta carpeta puede usarse para módulos CSS específicos si es necesario.

---

## ⚙️ Archivos de Configuración (Root)

### `package.json`

- **Importancia**: Define las dependencias del proyecto.
- **Librerías Críticas**:
  - `framer-motion`: Para todas las animaciones.
  - `lenis`: Para el smooth scroll.
  - `zustand`: Para el estado global (como el idioma).
  - `lucide-react`: Set de iconos estándar.

### `next.config.mjs`

- **Configuración**:
  - `unoptimized: true` en imágenes (útil para despliegues rápidos o placeholders).
  - `ignoreBuildErrors`: Activado temporalmente para facilitar el desarrollo rápido de UI.

### `tsconfig.json`

- **Alias de Caminos**: Configura `@/*` para que apunte a la carpeta raíz, permitiendo imports limpios como `import { Button } from "@/components/ui/button"`.

---

## 🚀 Guía de Escalabilidad por Capas

1.  **Capa de Datos**: Si añades una nueva sección con mucho texto, agrégalo primero a `data/i18n` en ambos idiomas.
2.  **Capa de Lógica**: Si necesitas interactividad compleja (ej. un modal que se abre desde varios sitios), crea un hook en `hooks/` o un store de Zustand.
3.  **Capa de Estilos**: Usa las variables CSS definidas en `:root` dentro de `globals.css` para mantener la consistencia del color y espaciado.
4.  **Capa de UI**: Mantén los componentes en `/components` lo más "puros" posible, recibiendo datos por props.
