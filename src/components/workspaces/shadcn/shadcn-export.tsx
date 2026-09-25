import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  SHADCN_EXPORTS,
  type ShadcnExportFeedback,
  type ShadcnExportFormat,
} from "@/types-and-consts/shadcn-exports";
import type { ShadcnTheme } from "@/types-and-consts/shadcn-theme";

interface ShadcnExportProps {
  theme: ShadcnTheme;
}

export const ShadcnExport = ({ theme }: ShadcnExportProps) => {
  const [format, setFormat] = useState<ShadcnExportFormat>("variables");
  const [feedback, setFeedback] = useState<ShadcnExportFeedback>();
  const config = SHADCN_EXPORTS[format];
  const content = config.serialize(theme);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setFeedback({ content, text: "Copied to clipboard." });
    } catch {
      setFeedback({
        content,
        text: "Clipboard unavailable. Select the code to copy, or download the file.",
      });
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([content], { type: `${config.mime};charset=utf-8` }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = config.filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback({ content, text: `Download started: ${config.filename}` });
  };
  return (
    <div className="flex min-w-0 flex-col gap-5">
      <div>
        <h2 className="text-xl font-semibold">Take your colors with you</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Every export includes light and dark, independent of the preview mode.
        </p>
      </div>
      <ToggleGroup
        aria-label="shadcn export format"
        variant="outline"
        value={[format]}
        onValueChange={(values) => {
          const value = values[0];
          if (value && Object.hasOwn(SHADCN_EXPORTS, value))
            setFormat(value as ShadcnExportFormat);
        }}
        className="max-w-full flex-wrap"
      >
        {Object.entries(SHADCN_EXPORTS).map(([value, entry]) => (
          <ToggleGroupItem key={value} value={value}>
            {entry.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <Card>
        <CardHeader>
          <CardTitle>{config.filename}</CardTitle>
          <CardDescription>{config.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={copy}>
              Copy code
            </Button>
            <Button onClick={download}>Download</Button>
          </div>
          <pre
            tabIndex={0}
            aria-label={`${config.label} output`}
            className="border-border focus-visible:ring-ring max-h-120 overflow-auto rounded-md border p-4 text-xs leading-relaxed outline-none focus-visible:ring-2"
          >
            <code>{content}</code>
          </pre>
        </CardContent>
      </Card>
      <p role="status" className="text-muted-foreground text-sm">
        {feedback?.content === content
          ? feedback.text
          : "Both light and dark schemes are included."}
      </p>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Use <code>.dark</code> on your application's root to select dark colors.
        Keep your existing fonts, radius, imports, animations, and other project
        configuration. These files contain color definitions only.
      </p>
    </div>
  );
};
