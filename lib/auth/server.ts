import { createNeonAuth } from '@neondatabase/auth/next/server';

/**
 * Configuración de Servidor para Neon Auth.
 * 
 * Define cómo se gestionan las cookies de sesión y se comunica con el 
 * servidor de autenticación de Neon.
 */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: {
    secret: process.env.NEON_AUTH_COOKIE_SECRET!, // Clave secreta para cifrar las cookies
  },
});

/**
 * Helper para obtener la sesión actual en Server Components o API Routes.
 */
export function getSession() {
  return auth.getSession();
}