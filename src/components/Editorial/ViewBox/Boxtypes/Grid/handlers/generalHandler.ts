export function parseGridDimensions(
  input: string
): { rows: number; cols: number } | null {
  if (!input) return null;
  const match = input.match(/^(\d+)x(\d+)$/);
  if (!match) {
    return null;
  }

  const [, rows, cols] = match;
  return {
    rows: Number(rows),
    cols: Number(cols),
  };
}
