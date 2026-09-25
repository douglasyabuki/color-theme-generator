import { Tabs } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";

export function MaterialTabs({
  className,
  ...props
}: Omit<Tabs.Root.Props, "orientation">) {
  return (
    <Tabs.Root
      {...props}
      orientation="horizontal"
      className={cn("flex min-w-0 flex-col", className)}
    />
  );
}

export function MaterialTabsList({ className, ...props }: Tabs.List.Props) {
  return (
    <Tabs.List
      {...props}
      activateOnFocus
      className={cn(
        "flex border-b border-(--md-sys-color-outline-variant) bg-(--md-sys-color-surface)",
        className,
      )}
    />
  );
}

export function MaterialTabsTrigger({
  className,
  children,
  ...props
}: Tabs.Tab.Props) {
  return (
    <Tabs.Tab
      {...props}
      className={cn(
        "group/tab relative isolate flex min-h-12 flex-1 cursor-pointer items-center justify-center border-0 bg-transparent px-3 py-0 text-sm font-medium text-(--md-sys-color-on-surface-variant) before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:bg-current before:opacity-0 before:transition-opacity before:duration-150 before:content-[''] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--md-sys-color-primary) enabled:hover:before:opacity-8 enabled:active:before:opacity-12 disabled:cursor-default disabled:text-(--md-sys-color-on-surface)/38 enabled:data-active:text-(--md-sys-color-primary) forced-colors:data-active:border-b-3 forced-colors:data-active:border-[Highlight]",
        className,
      )}
    >
      <span className="relative flex min-h-12 items-center group-data-active/tab:after:absolute group-data-active/tab:after:inset-x-0 group-data-active/tab:after:bottom-0 group-data-active/tab:after:h-0.75 group-data-active/tab:after:rounded-t-[3px] group-data-active/tab:after:bg-(--md-sys-color-primary) group-data-active/tab:after:content-['']">
        {children}
      </span>
    </Tabs.Tab>
  );
}

export function MaterialTabsPanel({ className, ...props }: Tabs.Panel.Props) {
  return (
    <Tabs.Panel
      {...props}
      className={cn(
        "min-w-0 pt-6 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-(--md-sys-color-primary) [&[hidden]]:hidden",
        className,
      )}
    />
  );
}
