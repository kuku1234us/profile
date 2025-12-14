import { Gallery } from "@/components/sections/Gallery"
import { Hero } from "@/components/sections/Hero"
import { TimelineGallery } from "@/components/timeline/timeline-gallery"
import { Section } from "@/components/ui/section"
import { timelineData } from "@/data/timeline-data"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Gallery />
      <Section id="timeline" className="bg-muted/30" clipOverflow={false}>
        <div className="container mx-auto mb-12 px-6 text-center">
          <h2 className="mb-4 font-heading text-3xl font-bold md:text-5xl">
            Evolution of Style
          </h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">
            Tracing our design philosophy through the years.
          </p>
        </div>
        <TimelineGallery data={timelineData} />
      </Section>
      <footer className="mt-10 border-t border-border py-10 text-center text-sm text-muted-foreground">
        <p>© 2025 Urban Gallery Template. All rights reserved.</p>
      </footer>
    </main>
  )
}


