/** Monta o caminho de um arquivo de /public respeitando o "base" do Vite (necessário no GitHub Pages). */
export const asset = (path: string) =>
  path ? `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}` : '';
