import { Routes } from '@angular/router';

/**
 * 🚦 ENRUTADOR PRINCIPAL (app.routes.ts)
 * ------------------------------------------------------------------
 * Este archivo es como el Recepcionista de tu tienda.
 * Cuando un usuario entra a "tusitio.com/carrito", este archivo mira
 * la URL "carrito" y decide a qué FEATURE enviarlo.
 * 
 * Aquí NO importamos componentes uno por uno. En Clean Architecture,
 * usaremos algo llamado "Lazy Loading" (Carga perezosa) para cargar
 * carpetas enteras de Features solo cuando el usuario haga clic en ellas.
 */
export const routes: Routes = [
  // Ejemplo futuro vacío:
  // { path: 'shop', loadChildren: () => import('./features/shop/shop.routes').then(m => m.SHOP_ROUTES) }
];
