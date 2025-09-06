import { downloadFile } from "./download-file";

type ExportThemeVarsOptions = {
  filename?: string;
  theme?: string;
};

export const exportThemeVars = ({
  filename = "default-theme-vars.txt",
  theme = "default",
}: ExportThemeVarsOptions = {}): void => {
  const root: HTMLElement = document.documentElement;
  const prev: string | null = root.getAttribute("data-theme");
  root.setAttribute("data-theme", theme);

  const prefixes = [
    "--primary",
    "--secondary",
    "--tertiary",
    "--error",
    "--neutral",
    "--custom",
  ];

  const wanted = (name: string): boolean => {
    const hasPrefix = prefixes.some((p) => name.startsWith(p));
    const endsWithNumber = /\d$/.test(name);
    return hasPrefix && endsWithNumber;
  };

  const names = new Set<string>();

  const addVarsFromStyleDecl = (
    styleDecl: CSSStyleDeclaration | undefined,
  ): void => {
    if (!styleDecl) return;
    for (let i = 0; i < styleDecl.length; i++) {
      const p = styleDecl[i];
      if (p && wanted(p)) names.add(p);
    }
  };

  const selectorMatchesHtml = (selectorText: string | undefined): boolean => {
    if (!selectorText) return false;
    for (const s of selectorText.split(",")) {
      const sel = s.trim();
      try {
        if (root.matches(sel)) return true;
      } catch {
        // invalid selector, skip
      }
    }
    return false;
  };

  const walkRuleList = (ruleList: CSSRuleList | undefined): void => {
    if (!ruleList) return;
    for (let i = 0; i < ruleList.length; i++) {
      const rule = ruleList[i];

      if (
        rule.type === CSSRule.STYLE_RULE &&
        selectorMatchesHtml((rule as CSSStyleRule).selectorText)
      ) {
        addVarsFromStyleDecl((rule as CSSStyleRule).style);
      }

      const anyRule = rule as CSSGroupingRule;
      if (anyRule.cssRules) walkRuleList(anyRule.cssRules);
    }
  };

  // Same-origin stylesheets
  for (const sheet of Array.from(document.styleSheets)) {
    try {
      walkRuleList(sheet.cssRules);
    } catch {
      // cross-origin, skip
    }
  }

  // Adopted stylesheets
  if ("adoptedStyleSheets" in document) {
    const adopted = (
      document as Document & { adoptedStyleSheets: CSSStyleSheet[] }
    ).adoptedStyleSheets;
    for (const sheet of adopted) {
      try {
        walkRuleList(sheet.cssRules);
      } catch {
        // skip
      }
    }
  }

  // Inline <html style="...">
  for (let i = 0; i < root.style.length; i++) {
    const prop = root.style[i];
    if (wanted(prop)) names.add(prop);
  }

  // Resolve values on <html> with theme applied
  const computed: CSSStyleDeclaration = getComputedStyle(root);
  const lines: string[] = [];
  for (const name of names) {
    const value = computed.getPropertyValue(name).trim();
    if (value) lines.push(`${name}: ${value}`);
  }

  // Restore previous theme
  if (prev !== null) root.setAttribute("data-theme", prev);
  else root.removeAttribute("data-theme");

  if (lines.length === 0) {
    console.warn(
      `No matching CSS variables for html[data-theme="${theme}"] ending with a number.`,
    );
    return;
  }

  // Trigger download
  downloadFile([lines.join("\n")], { type: "text/plain" }, filename);
};
