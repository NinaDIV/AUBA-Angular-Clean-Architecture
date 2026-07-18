# AUBA — E-commerce de Moda con Angular y Clean Architecture

![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)

Plataforma web e-commerce de moda y prendas de vestir, construida con los últimos estándares de Angular. Su valor principal no es solo la tienda: es la **arquitectura de referencia** que combina Clean Architecture, Arquitectura Hexagonal y Screaming Architecture para lograr una estructura escalable, mantenible y orientada al dominio.

## 🏗 Arquitectura del proyecto

Se implementa una combinación de **Screaming Architecture** (la estructura "grita" su propósito de negocio) y **Clean Architecture** (capas limpias y aisladas).

Esto permite que, al abrir la carpeta de archivos, veas inmediatamente **de qué trata el negocio** (catálogo, carrito, pagos) y no simplemente carpetas genéricas de programación (Models, Views, Controllers).

## ✨ Características

- Vitrina y catálogo general de productos (`shop`).
- Detalle de producto con tallas, color y SKU (`product-detail`).
- Carrito de compras con totales y aplicación de cupones (`cart`).
- Proceso de compra, envío y pasarela de pagos (`checkout`).
- Gestión del usuario: perfil, direcciones y órdenes pasadas (`account`).
- Cada *feature* dividida rigurosamente en 4 capas limpias (ver más abajo).

## 🛠 Tecnologías

| Tecnología | Rol |
|---|---|
| Angular | Framework SPA principal |
| TypeScript | Lenguaje base de toda la lógica |
| HTML5 / CSS3 | Capa de presentación |

## ✅ Requisitos previos

Antes de arrancar el proyecto necesitas tener instalado:

- **Node.js** (versión LTS recomendada) y **npm** — [nodejs.org](https://nodejs.org/)
- **Angular CLI** de forma global:

  ```bash
  npm install -g @angular/cli
  ```

- **Git** para clonar el repositorio.

## 🚀 Instalación y ejecución

1. Clona el repositorio:

   ```bash
   git clone https://github.com/NinaDIV/AUBA-Angular-Clean-Architecture.git
   cd AUBA-Angular-Clean-Architecture
   ```

2. Entra a la carpeta de la aplicación Angular (el código vive en `AUBA/`):

   ```bash
   cd AUBA
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

4. Levanta el servidor de desarrollo:

   ```bash
   ng serve
   ```

5. Abre el navegador en **http://localhost:4200/**. La aplicación se recarga automáticamente al modificar el código fuente.

### Build de producción

```bash
ng build
```

Los artefactos compilados se generan en la carpeta `dist/`.

## 📂 Estructura del proyecto

```text
src/
└── app/
    ├── core/                # 🧠 Núcleo de la app (uso transversal)
    │   ├── guards/          # Filtros de navegación (ej. auth.guard.ts, role.guard.ts)
    │   ├── interceptors/    # Interceptores HTTP (ej. manejo de tokens y errores)
    │   └── services/        # Servicios singleton (ej. temas, configuración global)
    │
    ├── shared/              # 🧩 UI Kit y utilidades reutilizables
    │   ├── ui/              # Componentes visuales "tontos" (botones, inputs, modales)
    │   ├── utils/           # Pipes, validadores, helpers y directivas
    │   └── data-access/     # Servicios simples que comparten datos globalmente
    │
    └── features/            # 🚀 Módulos de negocio funcionales
        │
        ├── shop/            # 🛍 FEATURE: Vitrina y catálogo general (lista de productos)
        ├── product-detail/  # 👗 FEATURE: Visualización de un producto específico (tallas, color, SKU)
        ├── cart/            # 🛒 FEATURE: Gestión del carrito de compras (totales, aplicar cupones)
        ├── checkout/        # 💳 FEATURE: Proceso de compra, envío y pasarela de pagos
        └── account/         # 👤 FEATURE: Gestión del usuario, perfil, mis direcciones y órdenes pasadas
```

## 🧱 Las 4 capas limpias (Clean Architecture)

El verdadero poder de este proyecto radica en que **cada módulo funcional (feature)** está rigurosamente dividido en 4 capas. Esta es la explicación detallada de **qué código debe ir obligatoriamente en cada capa**.

### 1. 📦 Domain (capa de dominio)

**¿Qué contiene?**
El "corazón" de las reglas y datos. Define cómo es la estructura de los datos del negocio (ej. cómo es un zapato, qué propiedades tiene una tarjeta de crédito).

- **Modelos de datos (`.model.ts`)**: clases e interfaces (ej. `Product`, `User`, `CartItem`).
- **Enumeradores (`.enum.ts`)**: opciones estáticas (ej. tallas `S, M, L`, categorías `SNEAKER, POLO, CAP`).
- **Interfaces (`.port.ts`)**: contratos que la infraestructura debe cumplir.

**Regla estricta:**
El código aquí debe ser **TypeScript puro** (modelos sin librerías de Angular). No puede hacer llamadas a internet, no le importa cómo se ve la interfaz, y bajo ninguna circunstancia debe importar cosas de otras capas.

### 2. 🌍 Infrastructure (capa de infraestructura)

**¿Qué contiene?**
El mundo exterior. Esta es la *única* capa autorizada a ir a buscar datos afuera de la memoria del navegador.

- **Servicios de API (`-api.service.ts`)**: funciones que hacen el `HttpClient.get()` a tu backend (NestJS/Node).
- **Adaptadores (`.adapter.ts`)**: código que interactúa con pasarelas de pago (Stripe, PayPal), LocalStorage (guardar sesión en el navegador), etc.
- **DTOs (`.dto.ts`)**: objetos para transportar datos de internet hacia la aplicación y viceversa.

**Regla estricta:**
Si necesitas extraer, guardar o actualizar información en tu base de datos o API, lo haces **aquí y solo aquí**. Luego pasas los datos limpios a la capa de aplicación.

### 3. ⚙️ Application (capa de aplicación o estado)

**¿Qué contiene?**
El "director de orquesta" y el "estado local". Conecta la vista con los datos del servidor.

- **Stores o Facades (`.store.ts` o `.facade.ts`)**: mantienen las variables globales de la vista activa (ej. `isCartLoading`, `selectedSize`, `filtersActive`).
- **Lógica de negocio inmediata**: si agregas un producto al carrito, aquí es donde sumas el precio y decides si aplicar el impuesto.

**Regla estricta:**
Esta capa le pregunta a `Infrastructure` por los datos, los manipula, y luego le avisa a `Presentation` qué debe mostrar en pantalla. Así evitas que los componentes de la vista terminen siendo archivos gigantes y difíciles de leer.

### 4. 🎨 Presentation (capa de presentación)

**¿Qué contiene?**
La experiencia visual y componentes de Angular puros. Exclusivamente HTML, CSS y lógica para mostrar/ocultar elementos visuales.

- **Pages (`.page.ts`)**: el cascarón de pantallas enteras que se asocian al *Router* (ej. `CheckoutPageComponent`).
- **Components (`.component.ts`)**: piezas visuales propias de este módulo (ej. `TShirtSelectorColorComponent`, `ShoeSizeList`).

**Regla estricta:**
Un componente visual **jamás debe hacer una petición `http.get` de frente**. Debe mantenerse "tonto". El usuario solo da clic al botón de la vista, y la vista simplemente le avisa a la capa de `Application`: "Oye, le dieron clic al botón de comprar este polo talla M". Todo el cálculo pesado y las llamadas a internet se hacen "detrás de escena".

## 📌 Gestión de tipos de producto (ej. zapatillas, polos, gorras)

El proyecto ha sido estructurado asumiendo que los tipos de prendas comparten bases pero divergen en UI (interfaz visual). Por ello:

- A nivel técnico-visual, encontrarás las particularidades bajo `src/app/features/product-detail/presentation/components/t-shirts/`, `sneakers/` y `caps/`.
- A nivel de negocio, todas las prendas son entidades que pasan por el mismo flujo de carrito (`cart/`) y pago (`checkout/`), reutilizando código, sin necesidad de separar el motor de cobros en múltiples sitios.
