import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

/**
 * 🚀 PUNTO DE ARRANQUE (main.ts)
 * ------------------------------------------------------------------
 * ¡Este es el motor de encendido del coche!
 * Es literalmente el PRIMER archivo que se ejecuta cuando el navegador
 * carga tu página web.
 * 
 * Lo único que hace es:
 * 1. Tomar tu Componente Raíz (`App` envuelto en HTML)
 * 2. Tomar tu Cerebro de Configuración (`appConfig`)
 * 3. Mandarlos a volar al navegador web.
 * 
 * REGLA DE ORO DE ARQUITECTURA: 
 * Este archivo NUNCA SE TOCA, a menos que estés agregando una 
 * configuración analítica muy avanzada o un sistema de monitoreo 
 * masivo de errores antes de encender la app.
 */

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
