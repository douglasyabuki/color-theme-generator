import { useState } from "react";

import type { MaterialColorTheme } from "../types-and-consts/material-design";
import { EXPORT_TARGETS } from "../types-and-consts/material-exports";

export const ExportPreview = ({ theme }: { theme: MaterialColorTheme }) => {
  const [target, setTarget] = useState<keyof typeof EXPORT_TARGETS>("semantic");
  const [feedback, setFeedback] = useState<{ text: string; content: string }>();
  const config = EXPORT_TARGETS[target];
  const content = config.serialize(theme);

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setFeedback({ text: "Copied to clipboard.", content });
    } catch {
      setFeedback({
        text: "Clipboard unavailable. Select the code to copy, or download the file.",
        content,
      });
    }
  };

  const downloadExport = () => {
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
    setFeedback({ text: `Download started: ${config.filename}`, content });
  };

  return (
    <section
      className="pt-6.75 [&_>_section+section]:mt-10"
      aria-labelledby="export-heading"
    >
      <div className="mb-4.75 flex items-end justify-between gap-5.5 max-[1150px]:block [&_>_p]:max-w-60 [&_>_p]:text-right [&_>_p]:text-[11px] [&_>_p]:leading-[1.6] [&_>_p]:text-(--md-sys-color-on-surface-variant) max-[1150px]:[&_>_p]:mt-2 max-[1150px]:[&_>_p]:max-w-none max-[1150px]:[&_>_p]:text-left [&_h2]:text-[22px] [&_h2]:leading-tight [&_h2]:font-medium [&_h2]:tracking-[-0.6px] [&>div>p:first-child]:mb-1.75 [&>div>p:first-child]:text-[9px] [&>div>p:first-child]:tracking-[1.4px] [&>div>p:first-child]:text-(--md-sys-color-on-surface-variant)">
        <div>
          <p className="text-[10px] font-[650] tracking-[1.8px] uppercase">
            Export / Both modes included
          </p>
          <h2 id="export-heading">Take your colors with you.</h2>
        </div>
        <p>Generated from the theme. Independent of the preview mode.</p>
      </div>
      <div
        className="mb-5.5 grid grid-cols-3 gap-2.5 max-[580px]:gap-1.75"
        aria-label="Export format"
      >
        {(Object.keys(EXPORT_TARGETS) as (keyof typeof EXPORT_TARGETS)[]).map(
          (key) => (
            <button
              className="flex flex-col gap-2.25 rounded-xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container-low) p-4.25 text-left text-(--md-sys-color-on-surface) aria-pressed:border-(--md-sys-color-primary) aria-pressed:bg-(--md-sys-color-secondary-container) aria-pressed:text-(--md-sys-color-on-secondary-container) max-[580px]:p-[12px_9px] [&_>_span:last-child]:text-[10px] [&_>_span:last-child]:leading-[1.6] max-[580px]:[&_>_span:last-child]:hidden [&_strong]:text-[12px] [&_strong]:font-semibold max-[580px]:[&_strong]:text-[10px]"
              aria-pressed={target === key}
              key={key}
              onClick={() => setTarget(key)}
            >
              <span
                className="font-[Consolas,monospace] text-[20px]"
                aria-hidden="true"
              >
                {key === "json" ? "{ }" : "#"}
              </span>
              <strong>{EXPORT_TARGETS[key].label}</strong>
              <span>{EXPORT_TARGETS[key].description}</span>
            </button>
          ),
        )}
      </div>
      <div className="overflow-hidden rounded-xl border border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface-container-low)">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-b-(--md-sys-color-outline-variant) px-4.5 py-3.5 max-[580px]:p-3.25">
          <span className="font-[Consolas,monospace] text-[11px]">
            {config.filename}
          </span>
          <div className="flex gap-2">
            <button
              className="inline-flex min-h-9 items-center gap-3 rounded-3xl border border-(--md-sys-color-outline) bg-transparent px-3.75 py-2 text-[11px] font-semibold text-(--md-sys-color-primary) [&:hover]:bg-(--md-sys-color-surface-container-high)"
              onClick={copyExport}
            >
              Copy code
            </button>
            <button
              className="inline-flex min-h-9 items-center gap-3 rounded-3xl border border-transparent bg-(--md-sys-color-primary) px-3.75 py-2 text-[11px] font-semibold text-(--md-sys-color-on-primary) [&:hover]:bg-(--md-sys-color-primary-container) [&:hover]:text-(--md-sys-color-on-primary-container)"
              onClick={downloadExport}
            >
              Download <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
        <pre
          className="m-0 max-h-132.5 overflow-auto p-6 text-[11px] leading-[1.9] tab-2 focus-visible:[outline:3px_solid_var(--md-sys-color-primary)] focus-visible:outline-offset-4 max-[580px]:p-4 max-[580px]:text-[10px]"
          tabIndex={0}
          aria-label={`${config.label} output`}
        >
          <code>{content}</code>
        </pre>
      </div>
      <p
        className="mt-3.25 min-h-4.5 text-[11px] text-(--md-sys-color-on-surface-variant)"
        role="status"
      >
        {feedback?.content === content
          ? feedback.text
          : "Both light and dark schemes are included in every export."}
      </p>
      <div className="mt-7 rounded-xl border border-(--md-sys-color-outline-variant) p-5.5 [&_code]:text-[11px] [&_code]:wrap-anywhere [&_h3]:mb-2.5 [&_h3]:text-[14px] [&_h3]:font-semibold [&_p]:text-[12px] [&_p]:leading-[1.9] [&_p]:text-(--md-sys-color-on-surface-variant)">
        <h3>Use it in your project</h3>
        <p>
          Import the semantic CSS, then set <code>data-mode="dark"</code> on
          your root element for dark mode. Style components with{" "}
          <code>var(--md-sys-color-primary)</code> and its paired foreground{" "}
          <code>var(--md-sys-color-on-primary)</code>.
        </p>
      </div>
    </section>
  );
};
