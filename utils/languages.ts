// ============================================================
// Programming Language Color Map
// Maps GitHub language names to their official colors
// ============================================================

export const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Go: "#00ADD8",
  Java: "#b07219",
  PHP: "#4F5D95",
  Rust: "#dea584",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Ruby: "#701516",
  Dart: "#00B4AB",
  Shell: "#89e051",
  "Vue": "#41b883",
  "HTML": "#e34c26",
  CSS: "#563d7c",
  SCSS: "#c6538c",
  Sass: "#a53b70",
  Less: "#1d365d",
  CoffeeScript: "#244776",
  Perl: "#0298c3",
  Scala: "#c22d40",
  Haskell: "#5e5086",
  Elixir: "#6e4a7e",
  Erlang: "#B83998",
  Clojure: "#db5855",
  "F#": "#b845fc",
  OCaml: "#3be133",
  Lua: "#000080",
  R: "#198CE7",
  MATLAB: "#e16737",
  Julia: "#a270ba",
  Vim: "#199f4b",
  PowerShell: "#012456",
  Dockerfile: "#384d54",
  "Jupyter Notebook": "#DA5B0B",
  Assembly: "#6E4C13",
  Nix: "#7e7eff",
  Zig: "#ec915c",
  Solidity: "#AA6746",
  HCL: "#844FBA",
  Groovy: "#e69f56",
  Makefile: "#427819",
  CMake: "#DA3434",
};

/**
 * Get the color for a programming language, with fallback
 */
export function getLanguageColor(language: string | null | undefined): string {
  if (!language) return "#8b949e";
  return LANGUAGE_COLORS[language] ?? "#8b949e";
}

/**
 * Calculate percentage share of each language in a repo
 */
export function calculateLanguagePercentages(
  languages: Record<string, number>
): Array<{ language: string; bytes: number; percentage: number; color: string }> {
  const total = Object.values(languages).reduce((sum, bytes) => sum + bytes, 0);
  if (total === 0) return [];

  return Object.entries(languages)
    .map(([language, bytes]) => ({
      language,
      bytes,
      percentage: Math.round((bytes / total) * 1000) / 10,
      color: getLanguageColor(language),
    }))
    .sort((a, b) => b.bytes - a.bytes);
}
