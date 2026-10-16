/**
 * Deploy base path helpers. `import.meta.env.BASE_URL` is `/` for root hosting
 * and e.g. `/Test-Video-Editor/` when served from a GitHub Pages project site.
 */
export const BASE_PATH = import.meta.env.BASE_URL.replace(/\/+$/, '')

/** Prefix a root-absolute app path (`/docs`) with the deploy base path. */
export function withBasePath(path: string): string {
  return `${BASE_PATH}${path}`
}

/** Remove the deploy base path from a `location.pathname`, yielding an app path. */
export function stripBasePath(pathname: string): string {
  if (!BASE_PATH || !pathname.startsWith(BASE_PATH)) return pathname
  return pathname.slice(BASE_PATH.length) || '/'
}
