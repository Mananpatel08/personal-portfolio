import type { CaseSection as Section } from "@/lib/data/projects";

/**
 * Number and title in a narrow left column, prose in a wide one. The pull-out
 * sits under the title rather than inside the text, so the reading column
 * stays a single uninterrupted measure.
 */
export function CaseSection({
  section,
  index,
}: {
  section: Section;
  index: number;
}) {
  return (
    <section className="grid grid-cols-1 gap-6 border-t border-line pt-10 lg:grid-cols-12 lg:gap-12 lg:pt-12">
      <div className="lg:col-span-3">
        <p className="font-mono text-nano tabular-nums text-ink-faint">
          {String(index).padStart(2, "0")}
        </p>
        <h2 className="mt-2 text-head text-ink">{section.title}</h2>

        {section.aside ? (
          <div className="mt-7 border-t border-line pt-5 lg:mt-9">
            <p className="text-nano text-ink-soft">{section.aside.label}</p>
            <ul className="mt-3 space-y-2">
              {section.aside.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-micro text-ink-soft"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] size-1 shrink-0 rounded-full bg-ink-faint"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="space-y-5 lg:col-span-8 lg:col-start-5">
        {section.body.map((paragraph, i) => (
          <p key={i} className="max-w-[64ch] text-lead text-ink-soft">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
