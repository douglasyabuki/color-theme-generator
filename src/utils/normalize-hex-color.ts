/**
 * Normalizes a three- or six-digit opaque hex color to uppercase six-digit form.
 *
 * @param value User-entered hex color, with or without a leading `#`.
 * @returns The normalized color, or `undefined` when the input is invalid.
 * @example
 * ```ts
 * normalizeHexColor("  #6750a4 "); // "#6750A4"
 * normalizeHexColor("not-a-color"); // undefined
 * ```
 */
export const normalizeHexColor = (value: string): string | undefined => {
  const hex = value.trim().replace(/^#/, "");
  if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex)) return undefined;
  return `#${(hex.length === 3 ? [...hex].map((char) => char + char).join("") : hex).toUpperCase()}`;
};
