export const applyCssVars = (vars: Record<string, string>) => {
  const { style } = document.documentElement;

  Object.entries(vars).forEach(([key, value]) => {
    style.setProperty(key, value);
  });
};
