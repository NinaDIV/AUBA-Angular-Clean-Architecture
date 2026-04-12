# AUBA E-Commerce

Este proyecto es una plataforma web e-commerce de moda y prendas de vestir, construida con los últimos estándares de Angular. Funciona bajo un esquema arquitectónico modular y escalable enfocado en escalabilidad a largo plazo.

## 🏗 Arquitectura del Proyecto

Hemos implementado una combinación de **Screaming Architecture** (Arquitectura que grita su propósito) y **Clean Architecture** (Capas limpias aisladas).

Esto permite que, al abrir la carpeta de archivos, veas inmediatamente **de qué trata el negocio** (Catálogo, Carrito, Pagos) y no simplemente carpetas genéricas de programación (Models, Views, Controllers).

---

### 📂 Estructura Principal

```text
src/
└── app/
    ├── core/                # 🧠 Núcleo de la app (uso transversal)
    │   ├── guards/          # Filtros de navegación (ej. auth.guard.ts, role.guard.ts)
    │   ├── interceptors/    # Interceptores HTTP (ej. manejo de tokens y errores)
    │   └── services/        # Servicios Singletons (ej. temas, configuración global)
    │
    ├── shared/              # 🧩 UI Kit y utilidades reutilizables
    │   ├── ui/              # Componentes visuales "tontos" (botones, inputs, modales)
    │   ├── utils/           # Pipes, validadores, helpers y directivas
    │   └── data-access/     # Servicios simples que comparten datos globalmente
    │
    └── features/            # 🚀 Módulos de Negocio Funcionales
        │
        ├── shop/            # 🛍 FEATURE: Vitrina y catálogo general (lista de productos)
        ├── product-detail/  # 👗 FEATURE: Visualización de un producto específico (Tallas, color, SKU)
        ├── cart/            # 🛒 FEATURE: Gestión del carrito de compras (totales, aplicar cupones)
        ├── checkout/        # 💳 FEATURE: Proceso de compra, envío y pasarela de pagos
        └── account/         # 👤 FEATURE: Gestión del usuario, perfil, mis direcciones y órdenes pasadas
```

---

## 🧱 Las 4 Capas Limpias (Clean Architecture)

El verdadero poder de este proyecto radica en que **cada módulo funcional (Feature)** está rigurosamente dividido en 4 capas. Esta es la explicación detallada de **qué código debe ir obligatoriamente en cada capa**.

### 1. 📦 Domain (Capa de Dominio)
**¿Qué contiene?**
El "corazón" de las reglas y datos. Contiene cómo es la estructura de los datos del negocio (ej. cómo es un zapato, qué propiedades tiene una tarjeta de crédito). 
- **Modelos de datos (`.model.ts`)**: Clases e interfaces (ej. `Product`, `User`, `CartItem`).
- **Enumeradores (`.enum.ts`)**: Opciones estáticas (ej. Tallas `S, M, L`, Categorías `SNEAKER, POLO, CAP`).
- **Interfaces (`.port.ts`)**: Contratos que la infraestructura debe cumplir.

**Regla estricta:** 
El código aquí debe ser **TypeScript puro** (Modelos sin librerías de Angular). No puede hacer llamadas a internet, no le importa cómo se ve la interfaz, y bajo ninguna circunstancia debe importar cosas de otras capas.

### 2. 🌍 Infrastructure (Capa de Infraestructura)
**¿Qué contiene?**
El mundo exterior. Esta es la *única* capa autorizada a ir a buscar datos afuera de la memoria del navegador.
- **Servicios de API (`-api.service.ts`)**: Funciones que hacen el `HttpClient.get()` a tu backend (NestJS/Node).
- **Adaptadores (`.adapter.ts`)**: Código que interactúa con pasarelas de pago (Stripe, Paypal), LocalStorage (guardar sesión en el navegador), etc.
- **DTOs (`.dto.ts`)**: Objetos para transportar datos de internet hacia la aplicación y viceversa.

**Regla estricta:** 
Si necesitas extraer, guardar o actualizar información en tu base de datos o API, lo haces **aquí y solo aquí**. Luego pasas los datos limpios a la capa de Aplicación.

### 3. ⚙️ Application (Capa de Aplicación o Estado)
**¿Qué contiene?**
El "Director de Orquesta" y el "Estado Local". Conecta la vista con los datos del servidor.
- **Stores o Facades (`.store.ts` o `.facade.ts`)**: Tienen variables globales de la vista activa (ej. `isCartLoading`, `selectedSize`, `filtersActive`).
- **Lógica de negocio inmediata**: Si agregas un producto al carrito, aquí es donde sumas el precio y decides si aplicar el impuesto.

**Regla estricta:**
Esta capa le pregunta al `Infrastructure` por los datos, los manipula, y luego le avisa al `Presentation` qué debe mostrar en pantalla. Así evitas que los componentes de la vista terminen siendo archivos gigantes, difíciles de leer.

### 4. 🎨 Presentation (Capa de Presentación)
**¿Qué contiene?**
La experiencia visual y componentes de Angular puros. Exclusivamente HTML, CSS y lógica para mostrar/ocultar cosas visuales.
- **Pages (`.page.ts`)**: El cascarón de pantallas enteras que se asocian al *Router* (ej. `CheckoutPageComponent`).
- **Components (`.component.ts`)**: Pedazos visuales propios de este módulo (ej. `TShirtSelectorColorComponent`, `ShoeSizeList`).

**Regla estricta:** 
Un componente visual **jamás debe hacer una petición `http.get` de frente**. Debe mantenerse "tonto". El usuario solo da clic al botón de la vista, y la vista debe simplemente avisarle felizmente a la capa de `Application`: "Oye, le dieron clic al botón de comprar este polo talla M". Todo el cálculo pesado y llamadas a internet se hacen "detrás de escena".

---

## 📌 Gestión de Tipos de Producto (Ej: Zapatillas, Polos, Gorras)
El proyecto ha sido estructurado asumiendo que los tipos de prendas comparten bases pero divergen en UI (Interface visual). Por ello:
- A nivel técnico-visual, encontrarás las particularidades bajo: `src/app/features/product-detail/presentation/components/t-shirts/`, `sneakers/` y `caps/`.
- A nivel de negocio, todas las prendas son entidades que pasan por el mismo flujo de Carrito `cart/` y pago `checkout/`, reutilizando código, sin necesidad de separar el motor de cobros en múltiples sitios.
