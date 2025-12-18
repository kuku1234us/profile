"use client"

import Image from "next/image"
import * as React from "react"

import styles from "./dashboard-animation.module.css"

export type DashboardBackground = {
  src: string
  width: number
  height: number
  alt?: string
}

export type DashboardLayerEnter = {
  /**
   * Extra delay on top of the global stagger (ms).
   * Useful when you want a specific element to come in later/earlier.
   */
  delayMs?: number
  /** Duration of the transition (ms). */
  durationMs?: number
  /** Initial offset in pixels (relative to the final position). */
  fromX?: number
  /** Initial offset in pixels (relative to the final position). */
  fromY?: number
  /** Initial blur amount (px). */
  blurPx?: number
  /** Initial scale amount (e.g. 0.98). */
  scaleFrom?: number
  /**
   * How far "in front of" the dashboard plane the element starts (px).
   * This is added on top of the final Z depth (layer.z).
   *
   * Higher values create the “falling onto the plane” look (Linear-style).
   */
  fromZ?: number
}

export type DashboardLayer = {
  id: string
  src: string
  alt?: string
  /**
   * If true, Next.js will preload this image (good for above-the-fold hero assets).
   * Use sparingly in normal pages, but it's appropriate for a hero dashboard.
   */
  priority?: boolean
  /**
   * Coordinates are relative to the background image's top-left corner.
   * These should be measured in the background image's native pixel space.
   */
  x: number
  y: number
  width: number
  height: number
  /**
   * Final depth of the element (px) relative to the plane.
   * Positive values move the element “towards the camera” and create parallax.
   */
  z?: number
  /**
   * Optional per-layer entrance animation settings.
   * If omitted, defaults are used.
   */
  enter?: DashboardLayerEnter
}

export type DashboardAnimationConfig = {
  background: DashboardBackground
  layers: DashboardLayer[]
}

export type DashboardTilt3D = {
  /** Camera perspective distance (px). Lower = more dramatic 3D. */
  perspectivePx?: number
  /** Base plane rotation around the X axis (degrees). */
  rotateXDeg?: number
  /** Base plane rotation around the Y axis (degrees). */
  rotateYDeg?: number
  /** Base plane rotation around the Z axis (degrees). */
  rotateZDeg?: number
  /** Base scale applied to the plane. */
  scale?: number
  /** Base translateX applied to the plane (px). */
  translateX?: number
  /** Base translateY applied to the plane (px). */
  translateY?: number
}

export type DashboardAnimationProps = {
  config: DashboardAnimationConfig
  /**
   * Outer wrapper styling (use this to control max width, shadows, rounding, etc).
   * The internal dashboard maintains the background aspect ratio.
   */
  className?: string
  /**
   * Base stagger delay between consecutive layers (ms).
   * This is applied in array order.
   */
  layerStaggerMs?: number
  /**
   * 3D framing for the dashboard. This mimics Linear’s angled “dashboard plane”.
   *
   * You can turn it off by passing `tilt={undefined}` and `enable3D={false}`.
   */
  tilt?: DashboardTilt3D
  /** When false, renders the dashboard straight-on (2D). */
  enable3D?: boolean
  /**
   * When true, draws a subtle debug overlay showing the background bounds.
   * (We can extend this later to show layer boxes.)
   */
  debug?: boolean
}

function pct(n: number) {
  // Keep a stable decimal precision to avoid layout jitter from long floats.
  return `${(Math.round(n * 10000) / 10000).toString()}%`
}

export function DashboardAnimation({
  config,
  className,
  layerStaggerMs = 90,
  enable3D = true,
  tilt,
  debug = false,
}: DashboardAnimationProps) {
  const { background, layers } = config

  const aspectRatio = `${background.width} / ${background.height}`

  // Defaults chosen to roughly match Linear’s hero framing.
  const t: Required<DashboardTilt3D> = {
    perspectivePx: tilt?.perspectivePx ?? 1400,
    rotateXDeg: tilt?.rotateXDeg ?? 50,
    rotateYDeg: tilt?.rotateYDeg ?? 18,
    rotateZDeg: tilt?.rotateZDeg ?? -8,
    scale: tilt?.scale ?? 1.06,
    translateX: tilt?.translateX ?? 0,
    translateY: tilt?.translateY ?? 10,
  }

  return (
    <div className={className}>
      <div
        className="relative w-full"
        style={{
          aspectRatio,
        }}
        aria-label={background.alt ?? "Dashboard preview"}
      >
        {/* 3D Camera wrapper (does not affect layout) */}
        <div
          className="absolute inset-0"
          style={
            enable3D
              ? {
                  perspective: `${t.perspectivePx}px`,
                  perspectiveOrigin: "70% 20%",
                }
              : undefined
          }
        >
          {/* The dashboard plane */}
          <div
            className="absolute inset-0 will-change-transform"
            data-dashboard-plane="true"
            style={
              enable3D
                ? {
                    transformStyle: "preserve-3d",
                    transform: `translate3d(${t.translateX}px, ${t.translateY}px, 0px) rotateX(${t.rotateXDeg}deg) rotateY(${t.rotateYDeg}deg) rotateZ(${t.rotateZDeg}deg) scale(${t.scale})`,
                  }
                : undefined
            }
          >
            {/* Background */}
            <Image
              src={background.src}
              alt={background.alt ?? "Dashboard background"}
              fill
              priority
              className="select-none object-contain"
              sizes="(max-width: 1024px) 100vw, 900px"
            />

            {/* Layers */}
            {layers.map((layer, idx) => {
              const left = layer.x / background.width
              const top = layer.y / background.height
              const w = layer.width / background.width
              const h = layer.height / background.height

              const durationMs = layer.enter?.durationMs ?? 700
              const delayMs = idx * layerStaggerMs + (layer.enter?.delayMs ?? 0)
              const fromX = layer.enter?.fromX ?? 0
              const fromY = layer.enter?.fromY ?? 14
              const blurPx = layer.enter?.blurPx ?? 8
              const scaleFrom = layer.enter?.scaleFrom ?? 0.985
              const finalZ = enable3D ? layer.z ?? 0 : 0
              const fromZ = enable3D ? layer.enter?.fromZ ?? 70 : 0

              return (
                <div
                  key={layer.id}
                  className="absolute"
                  data-dashboard-layer={layer.id}
                  style={{
                    left: pct(left * 100),
                    top: pct(top * 100),
                    width: pct(w * 100),
                    height: pct(h * 100),
                    zIndex: idx + 1,
                    pointerEvents: "none",
                    transformStyle: enable3D ? "preserve-3d" : undefined,
                  }}
                >
                  <div
                    className={`relative h-full w-full ${styles.layer}`}
                    style={{
                      // Drive the keyframes purely with CSS variables so the entrance
                      // starts immediately on first paint (no hydration wait).
                      ["--duration" as any]: `${durationMs}ms`,
                      ["--delay" as any]: `${delayMs}ms`,
                      ["--from-x" as any]: `${fromX}px`,
                      ["--from-y" as any]: `${fromY}px`,
                      ["--from-z" as any]: `${fromZ}px`,
                      ["--final-z" as any]: `${finalZ}px`,
                      ["--blur" as any]: `${blurPx}px`,
                      ["--scale-from" as any]: `${scaleFrom}`,
                    }}
                  >
                    <Image
                      src={layer.src}
                      alt={layer.alt ?? ""}
                      fill
                      className="select-none object-contain"
                      sizes="(max-width: 1024px) 100vw, 900px"
                      priority={layer.priority ?? false}
                    />
                  </div>
                </div>
              )
            })}

            {debug ? (
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] outline outline-1 outline-black/20" />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}


