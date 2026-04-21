"use client"

import { createAuthClient } from "@neondatabase/auth/next"

/**
 * Cliente de Autenticación para Neon Auth.
 * 
 * Se utiliza en componentes de React ("use client") para acceder al estado
 * de la sesión, login, logout y perfil del usuario.
 */
export const authClient = createAuthClient()