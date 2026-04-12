import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

/**
 * ⚙️ CONFIGURACIÓN GLOBAL (app.config.ts)
 * ------------------------------------------------------------------
 * Este es el Cerebro de Angular.
 * En las versiones antiguas de Angular, esto solía ser el "app.module.ts".
 * Como ahora usamos Angular Standalone (más moderno y limpio),
 * todo se configura aquí.
 * 
 * ¿Qué va aquí?
 * - Proveedores globales (Ej: Interceptores de Tokens para Login)
 * - Configuración del Router
 * - Módulos HTTP para hacer peticiones al servidor (HttpClient)
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), // Manejador de errores del navegador
    provideRouter(routes),                // Conectando el Enrutador
    provideClientHydration(withEventReplay()) // Habilitando hidratación para SSR súper veloz
  ]
};
