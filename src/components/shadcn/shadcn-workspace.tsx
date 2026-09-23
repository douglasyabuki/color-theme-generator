import { useLayoutEffect, useRef, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import type { ShadcnTheme } from "@/types-and-consts/shadcn-theme";
import type { ShadcnView } from "@/types-and-consts/shadcn-workspace";
import type { ThemeMode } from "@/types-and-consts/theme-mode";
import { applyShadcnScheme } from "@/utils/shadcn-dom";

import { ShadcnExport } from "./shadcn-export";
import { ShadcnPreview } from "./shadcn-preview";
import { ShadcnTokens } from "./shadcn-tokens";

export const ShadcnWorkspace = ({
  theme,
  mode,
  view,
  onViewChange,
}: {
  theme: ShadcnTheme;
  mode: ThemeMode;
  view: ShadcnView;
  onViewChange: (view: ShadcnView) => void;
}) => {
  const root = useRef<HTMLDivElement>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLDivElement | null>(
    null,
  );
  useLayoutEffect(() => {
    if (root.current) applyShadcnScheme(root.current, theme[mode]);
  }, [theme, mode]);
  return (
    <div
      ref={root}
      data-shadcn-workspace=""
      className={cn(
        "chroma-preview border-border bg-background text-foreground min-w-0 rounded-lg border p-4 sm:p-6",
        mode === "dark" && "dark",
      )}
      style={{ colorScheme: mode }}
    >
      <Tabs
        value={view}
        onValueChange={(value) => {
          if (value === "Preview" || value === "Tokens" || value === "Export")
            onViewChange(value);
        }}
        className="gap-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <TabsList aria-label="shadcn views">
            <TabsTrigger value="Preview">Preview</TabsTrigger>
            <TabsTrigger value="Tokens">Tokens</TabsTrigger>
            <TabsTrigger value="Export">Export</TabsTrigger>
          </TabsList>
          <span className="text-muted-foreground text-xs">
            {mode === "light" ? "Light" : "Dark"} scheme
          </span>
        </div>
        <TabsContent value="Preview">
          <ShadcnPreview portalContainer={portalContainer} />
        </TabsContent>
        <TabsContent value="Tokens">
          <ShadcnTokens scheme={theme[mode]} mode={mode} />
        </TabsContent>
        <TabsContent value="Export">
          <ShadcnExport theme={theme} />
        </TabsContent>
      </Tabs>
      <div ref={setPortalContainer} data-shadcn-portal-host="" />
    </div>
  );
};
