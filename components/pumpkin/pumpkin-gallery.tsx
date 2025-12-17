"use client"

import { Section } from "@/components/ui/section"

const galleryItems = [
  {
    id: 1,
    title: "Standups, but clearer",
    category: "Microsoft Teams",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Less rework",
    category: "Execution",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2000&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Faster handoffs",
    category: "Operations",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=2000&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "One source of truth",
    category: "Visibility",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2000&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-1",
  },
] as const

export function PumpkinGallery() {
  return (
    <Section id="gallery" className="bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="mb-3 font-heading text-3xl font-bold tracking-tight md:text-5xl">
            Gallery
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Placeholder visuals for now — we’ll replace these with real product
            screenshots and workflow mockups after the team votes on a direction.
          </p>
        </div>

        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:grid-cols-4 md:auto-rows-[280px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl bg-muted ${item.span}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
              <div className="absolute bottom-0 left-0 translate-y-4 p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                <p className="mb-1 text-sm font-medium text-white/85">
                  {item.category}
                </p>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}


