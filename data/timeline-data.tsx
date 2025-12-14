import Image from "next/image"

import type { TimePeriod } from "@/components/timeline/types"

export const timelineData: TimePeriod[] = [
  {
    label: "2025",
    elements: [
      {
        id: "1",
        title: "The Glass House",
        subtitle: "Future Concepts",
        description:
          "A transparent living space designed for the modern naturalist, blurring the lines between indoor luxury and outdoor serenity.",
        image:
          "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
        expandedContent: (
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              The Glass House concept challenges the traditional boundaries
              between shelter and environment. By utilizing advanced smart-glass
              technology, the walls can transition from completely transparent to
              fully opaque in milliseconds, providing privacy on demand while
              maintaining a deep connection to nature.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="relative h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1600210492486-bcc705c6c6bd?q=80&w=1000&auto=format&fit=crop"
                  alt="Interior View"
                  fill
                  className="rounded-xl object-cover shadow-md"
                />
              </div>
              <div className="relative h-64 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop"
                  alt="Garden View"
                  fill
                  className="rounded-xl object-cover shadow-md"
                />
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-foreground">
                Sustainability Features
              </h3>
              <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                <li>Passive solar heating and cooling</li>
                <li>Rainwater harvesting systems integrated into the roof</li>
                <li>Biodegradable structural components</li>
              </ul>
            </div>
          </div>
        ),
      },
      {
        id: "2",
        title: "Urban Vertical",
        subtitle: "High-Rise Living",
        description:
          "Reimagining vertical density with sustainable sky-gardens and communal pods.",
        image:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop",
        expandedContent: (
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              As cities grow denser, &quot;Urban Vertical&quot; proposes a new
              paradigm where altitude doesn&apos;t mean isolation. This project
              integrates vertical parks, agricultural zones, and community hubs
              every ten floors, creating neighborhoods in the sky.
            </p>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1449824913929-2ec478621440?q=80&w=2000&auto=format&fit=crop"
                className="object-cover"
                fill
                alt="Skyline"
              />
            </div>
            <div>
              <h3 className="mb-4 text-2xl font-semibold text-foreground">
                Community Pods
              </h3>
              <p className="text-muted-foreground">
                Each residential cluster features a shared &apos;pod&apos;
                containing co-working spaces, gymnasiums, and hydroponic gardens,
                fostering interaction among residents.
              </p>
            </div>
          </div>
        ),
      },
    ],
  },
  {
    label: "2024",
    elements: [
      {
        id: "3",
        title: "Nordic Retreat",
        subtitle: "Scandinavian Design",
        description:
          "Minimalist architecture focusing on light, wood, and hygge in the heart of the city.",
        image:
          "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
        expandedContent: (
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Inspired by the harsh but beautiful Nordic landscape, this design
              emphasizes rapid construction using pre-fabricated timber modules.
              The result is a warm, inviting space that significantly reduces the
              carbon footprint compared to traditional concrete structures.
            </p>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
              <div className="flex h-40 items-center justify-center rounded-lg bg-zinc-200 text-zinc-500">
                Sketch 1
              </div>
              <div className="flex h-40 items-center justify-center rounded-lg bg-zinc-200 text-zinc-500">
                Sketch 2
              </div>
              <div className="flex h-40 items-center justify-center rounded-lg bg-zinc-200 text-zinc-500">
                Sketch 3
              </div>
            </div>
          </div>
        ),
      },
      {
        id: "4",
        title: "Industrial Loft",
        subtitle: "Adaptive Reuse",
        description:
          "Converting historic factories into premium living spaces while preserving their raw character.",
        image:
          "https://images.unsplash.com/photo-1542889601-399c4f3a8402?q=80&w=2070&auto=format&fit=crop",
        expandedContent: (
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Adaptive reuse is more than just renovation; it&apos;s about
              honoring history. We retained the original brickwork and exposed
              steel beams of this 1920s textile factory, integrating modern
              amenities within the industrial shell.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 text-xl italic text-foreground">
              &quot;The most sustainable building is the one that already
              exists.&quot;
            </blockquote>
          </div>
        ),
      },
    ],
  },
  {
    label: "2023",
    elements: [
      {
        id: "5",
        title: "Desert Modernism",
        subtitle: "Arid Architecture",
        description:
          "Sustainable cooling and geometric forms in harmony with the desert landscape.",
        image:
          "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?q=80&w=2070&auto=format&fit=crop",
        expandedContent: (
          <div className="space-y-8">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Designed for extreme climates, Desert Modernism utilizes thermal
              mass and aerodynamic geometry to naturally cool the living spaces.
              The stark aesthetic mirrors the surrounding dunes.
            </p>
          </div>
        ),
      },
    ],
  },
]


