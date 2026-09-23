import { ChevronDownIcon, FolderIcon, HomeIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  SHADCN_COLOR_TOKENS,
  SHADCN_TOKEN_MANIFEST,
} from "@/types-and-consts/shadcn-manifest";

export const ShadcnPreview = ({
  portalContainer,
}: {
  portalContainer: HTMLElement | null;
}) => {
  const [activeItem, setActiveItem] = useState("Overview");
  const [feedback, setFeedback] = useState(
    "Try an action, focus the input, or open the menu.",
  );
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-semibold">Your colors, in context</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Colors use standard shadcn theme tokens. Preview styling is
          illustrative.
        </p>
      </div>
      <SidebarProvider
        keyboardShortcut={false}
        className="min-h-0 flex-col gap-4 sm:flex-row"
      >
        <Sidebar
          collapsible="none"
          className="border-sidebar-border w-full shrink-0 rounded-lg border sm:w-40"
          aria-label="Example sidebar"
        >
          <SidebarHeader>
            <span className="px-2 py-2 text-sm font-semibold">Workspace</span>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    { label: "Overview", icon: HomeIcon },
                    { label: "Library", icon: FolderIcon },
                  ].map(({ label, icon: Icon }) => (
                    <SidebarMenuItem key={label}>
                      <SidebarMenuButton
                        isActive={activeItem === label}
                        aria-pressed={activeItem === label}
                        onClick={() => {
                          setActiveItem(label);
                          setFeedback(
                            `${label} selected in the example sidebar.`,
                          );
                        }}
                      >
                        <Icon />
                        <span>{label}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground m-2 rounded-md p-3 text-sm">
              One source.
              <br />A shared palette.
            </div>
          </SidebarContent>
        </Sidebar>
        <Card className="min-w-0 flex-1">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>Project details</CardTitle>
              <Badge variant="secondary">Draft</Badge>
            </div>
            <CardDescription>
              Surfaces, actions, and content from the same theme.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="preview-project-name">
                  Project name
                </FieldLabel>
                <Input
                  id="preview-project-name"
                  type="text"
                  defaultValue="A new perspective"
                  aria-describedby="preview-project-help"
                />
                <FieldDescription id="preview-project-help">
                  Focus this field to inspect the input border and focus ring.
                </FieldDescription>
              </Field>
            </FieldGroup>
            <div className="bg-muted text-muted-foreground rounded-md p-4 text-sm">
              Muted content supports the main story without competing with it.
            </div>
            <Separator />
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setFeedback("Primary action selected.")}>
                <PlusIcon data-icon="inline-start" />
                Create project
              </Button>
              <Button
                variant="secondary"
                onClick={() => setFeedback("Secondary action selected.")}
              >
                Save draft
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  setFeedback(
                    "Destructive action previewed. No data was deleted.",
                  )
                }
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => setFeedback("Outline action selected.")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex-wrap gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" />}
                disabled={!portalContainer}
              >
                Project menu
                <ChevronDownIcon data-icon="inline-end" />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                portalContainer={portalContainer}
                className="min-w-48"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Project actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() =>
                      setFeedback("Rename selected from the menu.")
                    }
                  >
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      setFeedback("Duplicate selected from the menu.")
                    }
                  >
                    Duplicate
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() =>
                      setFeedback("Archive previewed. No project was changed.")
                    }
                  >
                    Archive
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-muted-foreground text-xs">
              Hover or use arrow keys to see accent states.
            </span>
          </CardFooter>
        </Card>
      </SidebarProvider>
      <p role="status" className="text-muted-foreground text-sm">
        {feedback}
      </p>
      <section
        aria-labelledby="chart-colors-heading"
        className="flex flex-col gap-3"
      >
        <h3 id="chart-colors-heading" className="text-sm font-medium">
          Chart colors
        </h3>
        <div className="grid grid-cols-5 gap-2">
          {SHADCN_COLOR_TOKENS.filter(
            (token) => SHADCN_TOKEN_MANIFEST[token].group === "Charts",
          ).map((token) => (
            <div key={token} className="flex min-w-0 flex-col gap-2">
              <div
                className="border-border h-16 rounded-md border"
                style={{ backgroundColor: `var(--${token})` }}
              />
              <span className="text-muted-foreground text-xs">{token}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
