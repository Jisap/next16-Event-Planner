import { NextRequest } from "next/server";

/**
 * Middleware Proxy para Neon Auth.
 * 
 * Este archivo actúa como el punto de entrada para proteger las rutas de la aplicación.
 * Verifica si el usuario tiene una sesión activa y, de lo contrario, lo redirige 
 * a la página de inicio de sesión.
 * 
 * @param request - La petición HTTP entrante.
 */
export default async function proxy(request: NextRequest) {
  // Importación dinámica para asegurar compatibilidad con Next.js Edge Runtime
  const { auth } = await import("@/lib/auth/server");
  
  // Ejecuta la lógica de protección de rutas
  return auth.middleware({ 
    loginUrl: "/auth/sign-in" 
  })(request);
}

/**
 * Configuración para que Next.js sepa qué rutas debe procesar el middleware.
 * Esto es CRUCIAL para que los estilos (CSS) funcionen bien.
 */
export const config = {
  matcher: [
    /*
     * Excluye:
     * - api (rutas de API)
     * - _next/static (estilos CSS, JS de Next)
     * - _next/image (imágenes optimizadas)
     * - favicon.ico (icono del sitio)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};