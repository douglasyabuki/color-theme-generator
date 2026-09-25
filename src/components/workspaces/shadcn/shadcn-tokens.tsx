import { formatArgbOklch } from "@/lib/format-oklch";
import {
  SHADCN_COLOR_TOKENS,
  SHADCN_TOKEN_GROUPS,
  SHADCN_TOKEN_MANIFEST,
} from "@/types-and-consts/shadcn-manifest";
import type { ShadcnColorScheme } from "@/types-and-consts/shadcn-theme";
import type { ThemeMode } from "@/types-and-consts/theme-mode";
import { describeShadcnTokenSource } from "@/utils/shadcn-token-source";

interface ShadcnTokensProps {
  scheme: ShadcnColorScheme;
  mode: ThemeMode;
}

export const ShadcnTokens = ({ scheme, mode }: ShadcnTokensProps) => {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">shadcn token audit</h2>
        <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
          shadcn uses a smaller semantic color system than Material. These
          values are derived from the generated Material theme and mapped to the
          roles expected by standard shadcn components.
        </p>
      </div>
      {SHADCN_TOKEN_GROUPS.map((group) => (
        <section
          key={group}
          className="flex flex-col gap-3"
          aria-label={`${group} tokens`}
        >
          <h3 className="text-sm font-semibold">{group}</h3>
          <dl className="grid gap-3 xl:grid-cols-2">
            {SHADCN_COLOR_TOKENS.filter(
              (token) => SHADCN_TOKEN_MANIFEST[token].group === group,
            ).map((token) => (
              <div
                key={token}
                className="border-border flex min-w-0 flex-col gap-2 rounded-md border p-3"
              >
                <dt className="text-sm font-medium wrap-anywhere">{token}</dt>
                <dd className="flex min-w-0 items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="border-border size-10 shrink-0 rounded border"
                    style={{
                      backgroundColor: formatArgbOklch(scheme[token]),
                    }}
                  />
                  <span className="text-muted-foreground flex min-w-0 flex-col gap-1 text-xs">
                    <code className="wrap-anywhere">
                      {formatArgbOklch(scheme[token])}
                    </code>
                    <span>{describeShadcnTokenSource(token, mode)}</span>
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
};
