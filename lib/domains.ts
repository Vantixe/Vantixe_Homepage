/**
 * Domain configuration for the dual-domain setup.
 * vantixe.com = consulting (bright), vantixe.ai = technology (dark)
 */

export const DOMAINS = {
  consulting: 'https://www.vantixe.com',
  technology: 'https://vantixe.ai',
} as const

/**
 * Maps /technology/* paths to vantixe.ai root paths.
 * e.g. /technology/tprm → https://vantixe.ai/tprm
 */
export function getTechUrl(path: string): string {
  const cleanPath = path.replace(/^\/technology/, '') || '/'
  return `${DOMAINS.technology}${cleanPath}`
}

/**
 * Maps consulting paths to vantixe.com.
 * e.g. /about → https://www.vantixe.com/about
 */
export function getConsultingUrl(path: string): string {
  return `${DOMAINS.consulting}${path}`
}
