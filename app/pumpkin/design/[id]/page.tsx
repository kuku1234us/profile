import { redirect } from "next/navigation"

import { PumpkinGallery } from "@/components/pumpkin/pumpkin-gallery"
import { PumpkinHeroDesign1 } from "@/components/pumpkin/pumpkin-hero-design1"
import { Section } from "@/components/ui/section"

function normalizeId(id: string) {
  if (id === "2" || id === "3") return id
  if (id === "1") return "1"
  return null
}

export default async function PumpkinDesignPage({
  params,
}: {
  // Next 16 may provide `params` as a Promise in some modes.
  params: { id: string } | Promise<{ id: string }>
}) {
  const resolvedParams = await Promise.resolve(params)
  const rawId = await Promise.resolve((resolvedParams as { id: unknown }).id)
  const id = typeof rawId === "string" ? normalizeId(rawId) : null

  // Keep /pumpkin as the canonical Design 1 URL.
  if (id === "1") redirect("/pumpkin")
  if (!id) redirect("/pumpkin")

  return (
    <main>
      {/* Hero stays consistent across designs (per spec) */}
      <PumpkinHeroDesign1 />

      <Section id="design" className="bg-background" noPadding>
        <div className="container mx-auto px-6 py-16">
          <div className="rounded-2xl border bg-background p-6">
            <h2 className="text-xl font-semibold tracking-tight">
              {id === "2" ? "Design 2" : "Design 3"} (coming soon)
            </h2>
            <p className="mt-2 text-muted-foreground">
              This route exists so coworkers can switch mockups via the navbar.
              We’ll implement the actual layout for this design after feedback.
            </p>
          </div>
        </div>
      </Section>

      <PumpkinGallery />
    </main>
  )
}


