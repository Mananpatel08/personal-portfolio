import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { IconPackage } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export function PackageCard({ className }: { className?: string }) {
  return (
    <Card className={cn("flex flex-col p-4", className)}>
      <div>
        <Pill icon={<IconPackage />}>Published</Pill>
      </div>

      <div className="mt-6 flex-1">
        <h2 className="text-head text-ink">mssql2mysql</h2>
        <p className="mt-2 text-body text-ink-soft">
          Migrates SQL Server to MySQL from a single YAML file.
        </p>
      </div>

      <div className="well mt-5 flex items-center gap-2 p-3">
        <span aria-hidden="true" className="font-mono text-nano text-accent">
          $
        </span>
        <code className="truncate font-mono text-nano text-ink">
          pip install mssql2mysql
        </code>
      </div>

      <div className="mt-4">
        <ArrowLink href="https://pypi.org/project/mssql2mysql/" external>
          View on PyPI
        </ArrowLink>
      </div>
    </Card>
  );
}
