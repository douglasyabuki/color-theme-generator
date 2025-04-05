type OklchScale = Record<string, string>;

/**
 * Generates a custom OKLCH color scale using specific step keys,
 * treating the given oklch(l, c, h) as the 500 color.
 */
export const generateTailwindOklchScale = (
  l: number,
  c: number,
  h: number,
): OklchScale => {
  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  const steps = [
    0, 20, 40, 50, 60, 80, 100, 130, 200, 300, 400, 500, 600, 700, 760, 780,
    800, 830, 880, 900, 940, 960, 1000,
  ];

  const result: OklchScale = {};

  for (const step of steps) {
    const key = step.toString();

    if (step === 0) {
      result[key] = "oklch(1 0 0)";
      continue;
    }

    if (step === 1000) {
      result[key] = "oklch(0 0 0)";
      continue;
    }

    // Relative offset to 500
    const diff = (step - 500) / 500;

    // Lightness curve: steeper near the ends, flatter in the middle
    const lAdj = clamp(l - diff * 0.5, 0, 1);

    // Chroma curve: less saturation on the ends
    const chromaMultiplier = 1 - Math.abs(diff); // 1 at 500, 0 at 0 and 1000
    const cAdj = clamp(c * chromaMultiplier, 0, 0.4);

    result[key] =
      `oklch(${lAdj.toFixed(3)} ${cAdj.toFixed(3)} ${h.toFixed(3)})`;
  }

  return result;
};
