import { Tabs } from "@base-ui/react/tabs";

import { cn } from "@/lib/utils";

export function MaterialTabs({ className, ...props }: Omit<Tabs.Root.Props, "orientation">) {
  return <Tabs.Root {...props} orientation="horizontal" className={cn("material-tabs", className)} />;
}

export function MaterialTabsList({ className, ...props }: Tabs.List.Props) {
  return <Tabs.List {...props} activateOnFocus className={cn("material-tabs__list", className)} />;
}

export function MaterialTabsTrigger({ className, children, ...props }: Tabs.Tab.Props) {
  return <Tabs.Tab {...props} className={cn("material-tabs__trigger", className)}><span className="material-tabs__label">{children}</span></Tabs.Tab>;
}

export function MaterialTabsPanel({ className, ...props }: Tabs.Panel.Props) {
  return <Tabs.Panel {...props} className={cn("material-tabs__panel", className)} />;
}
