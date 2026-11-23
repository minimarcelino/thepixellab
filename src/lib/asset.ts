/**
 * Monta o caminho de um arquivo de /public respeitando o "base" do Vite (necessário no GitHub Pages).
 * Endereços completos (https:, data:, blob:) são devolvidos sem alteração.
 */
export const asset = (path: string) => {
  if (!path) return '';
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
};
