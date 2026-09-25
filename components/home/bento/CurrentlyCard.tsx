import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconTerminal } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** The integration I’m proudest of on Timely, drawn rather than described. */
function IntegrationFlow() {
  return (
    <div className="well p-3.5 sm:p-4">
      <div className="flex items-center gap-2.5 font-mono text-nano">
        <span className="rounded-[5px] bg-ink/6 px-1.5 py-0.5 text-ink">
          POST
        </span>
        <span className="truncate text-ink-soft">/api/hooks/{"{slug}"}</span>
        <span className="ml-auto shrink-0 text-ink-soft">jenkins</span>
      </div>

      <div aria-hidden="true" className="my-2 ml-[1.4rem] h-3.5 w-px bg-line" />

      <div className="flex items-center gap-2.5 font-mono text-nano">
        <span className="rounded-[5px] bg-ink/6 px-1.5 py-0.5 text-ink">WS</span>
        <span className="truncate text-ink-soft">timely/chat/engineering</span>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 text-ink-soft">
          <span className="size-1.5 rounded-full bg-live" />
          delivered
        </span>
      </div>
    </div>
  );
}

export function CurrentlyCard({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col p-4", className)}>
      <div>
        <Pill icon={<IconTerminal />}>Currently building</Pill>
      </div>

      <div className="mt-6 flex-1">
        <h2 className="text-[1.65rem] leading-[1.1] font-medium tracking-[-0.03em] text-ink">
          Timely
        </h2>
        <p className="mt-2.5 max-w-[46ch] text-body text-ink-soft">
          Project management and CRM behind one login, used daily by 40–50
          people. Sole developer — API, interface and deployment.
        </p>
      </div>

      <div className="mt-6">
        <IntegrationFlow />
        <p className="mt-2.5 text-nano text-ink-soft">
          Build notifications post straight into internal chat, over a
          token-bound slug rather than a user session.
        </p>
      </div>

      <div className="mt-6">
        <ArrowLink href="/work/timely">Read the case study</ArrowLink>
      </div>
    </Card>
  );
}
