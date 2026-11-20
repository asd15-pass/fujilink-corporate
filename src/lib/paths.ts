export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${BASE_PATH}${path}`;
}

export function withBaseInHtml(html: string): string {
  if (!BASE_PATH) return html;
  return html.replaceAll('src="/', `src="${BASE_PATH}/`);
}
