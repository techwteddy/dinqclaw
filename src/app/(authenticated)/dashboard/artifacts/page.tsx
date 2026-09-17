import { FileText, ImageIcon } from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

function EmptyState({
  icon: Icon,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}) {
  return (
    <div className="border-border mt-4 flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-14 text-center">
      <Icon className="text-muted-foreground/50 size-8" />
      <p className="text-sm font-medium">Nothing created yet</p>
      <p className="text-muted-foreground max-w-xs text-sm">{description}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto w-full max-w-2xl px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-2xl font-semibold tracking-tight">Artifacts</h1>
        <Separator className="mt-4" />

        <Tabs defaultValue="artifacts" className="mt-6">
          <TabsList>
            <TabsTrigger value="artifacts">Artifacts</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="artifacts">
            <EmptyState
              icon={FileText}
              description="When Lucy creates a document, it appears here."
            />
          </TabsContent>

          <TabsContent value="media">
            <EmptyState
              icon={ImageIcon}
              description="When Lucy creates an image, it appears here."
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
