export function tokenKeyToCssVar(key: string): string {
  return `--${key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
}

export function sidebarKeyToCssVar(key: string): string {
  return `--sidebar-${key.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()}`;
}
