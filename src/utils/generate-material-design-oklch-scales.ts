export type OklchScales = Record<string, string>;

export const generateMaterialDesignOklchScales = (
  l: number,
  c: number,
  h: number,
  prefix?: string,
): OklchScales => {
  const clamp = (val: number, min: number, max: number) =>
    Math.max(min, Math.min(max, val));

  const steps = [
    0, 4, 6, 10, 12, 17, 22, 24, 10, 20, 30, 40, 50, 60, 70, 80, 87, 90, 92, 94,
    95, 96, 98, 100,
  ];

  const result: OklchScales = {};

  for (const step of steps) {
    const baseKey = step.toString();
    const key = prefix ? `--${prefix}-${baseKey}` : baseKey;

    if (step === 0) {
      result[key] = "oklch(0 0 0)";
      continue;
    }

    if (step === 100) {
      result[key] = "oklch(1 0 0)";
      continue;
    }

    if (step === 40) {
      result[key] = `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${h.toFixed(3)})`;
      continue;
    }

    const diff = (step - 40) / 60;

    const lAdj = clamp(l + diff * (1 - l), 0, 1);
    const chromaMultiplier = 1 - Math.abs(diff);
    const cAdj = clamp(c * chromaMultiplier, 0, 0.4);

    result[key] =
      `oklch(${lAdj.toFixed(3)} ${cAdj.toFixed(3)} ${h.toFixed(3)})`;
  }

  return result;
};
