import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * 🏠 COMPONENTE RAÍZ (app.ts o app.component.ts)
 * ------------------------------------------------------------------
 * Este es el "Cascarón" visual de toda la aplicación.
 * Es el primer componente HTML que Angular dibuja en la pantalla.
 * 
 * Todo el contenido dinámico (tu catálogo, tu carrito, tu checkout)
 * se inyectará automáticamente dentro de donde pusimos el "<router-outlet>".
 *
 * NOTA: Este archivo debe mantenerse MUY CHICO. No programes lógica
 * de negocio de la tienda aquí. Nunca.
 */
@Component({
  selector: 'app-root',            // La etiqueta HTML principal <app-root> (definida en index.html)
  imports: [RouterOutlet],         // Traemos el RouterOutlet para pintar páginas adentro
  templateUrl: './app.html',       // Archivo HTML asociado
  styleUrl: './app.css'            // Archivo CSS asociado
})
export class App {
  // Variable moderna (Signal) para el título de tu web.
  protected readonly title = signal('AUBA');
}
