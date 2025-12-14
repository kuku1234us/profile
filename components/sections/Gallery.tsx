"use client"

import { Section } from "@/components/ui/section"

const galleryItems = [
  {
    id: 1,
    title: "Modern Loft",
    category: "Interior",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1974&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Cozy Corner",
    category: "Living Room",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=2070&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Minimalist Kitchen",
    category: "Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=2070&auto=format&fit=crop",
    span: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "Serene Bedroom",
    category: "Bedroom",
    image:
      "https://images.unsplash.com/photo-1616594039964-40891a90b3b5?q=80&w=2069&auto=format&fit=crop",
    span: "md:col-span-2 md:row-span-1",
  },
]

export function Gallery() {
  return (
    <Section id="gallery" className="bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-5xl">
            Curated Details
          </h2>
          <p className="max-w-xl text-lg text-muted-foreground">
            Every corner is composed with purpose. Explore our gallery of premium
            spaces designed for modern living.
          </p>
        </div>

        <div className="grid auto-rows-[300px] grid-cols-1 gap-4 md:grid-cols-4">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`relative group overflow-hidden rounded-2xl bg-muted ${item.span}`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url(${item.image})` }}
              />
              <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
              <div className="absolute bottom-0 left-0 translate-y-4 p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                <p className="mb-1 text-sm font-medium text-white/80">
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


