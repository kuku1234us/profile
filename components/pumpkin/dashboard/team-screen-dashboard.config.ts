import type { DashboardAnimationConfig } from "./dashboard-animation"

/**
 * Pumpkin "Team Screen" dashboard config.
 *
 * Coordinates are measured in the background image's native pixel space.
 * Background: 1406 × 809
 */
export const teamScreenDashboardConfig: DashboardAnimationConfig = {
  background: {
    src: "/TeamScreenAssets/DashboardBackground.png",
    width: 1406,
    height: 809,
    alt: "Pumpkin dashboard background",
  },
  layers: [
    {
      id: "apps-bar",
      src: "/TeamScreenAssets/AppsBar.png",
      alt: "Apps bar",
      priority: true,
      x: 0,
      y: 48,
      width: 67,
      height: 280,
      // LANDING MODEL: final Z = 0 (same plane as the background).
      // We only use fromZ to create the "falling onto the plane" entrance.
      enter: { fromX: -10, fromY: 0, fromZ: 90, blurPx: 10, scaleFrom: 0.99 },
    },
    {
      id: "search-field",
      src: "/TeamScreenAssets/SearchField.png",
      alt: "Search field",
      priority: true,
      x: 389,
      y: 7,
      width: 626,
      height: 34,
      enter: { fromY: -10, fromZ: 100, blurPx: 10, scaleFrom: 0.99 },
    },
    {
      id: "channels",
      src: "/TeamScreenAssets/Channels.png",
      alt: "Channels list",
      priority: true,
      x: 67,
      y: 149,
      width: 321,
      height: 660,
      enter: { fromY: 18, fromZ: 80, blurPx: 10, scaleFrom: 0.985 },
    },
    {
      id: "chat-area",
      src: "/TeamScreenAssets/ChatArea.png",
      alt: "Chat area",
      priority: true,
      x: 388,
      y: 108,
      width: 1018,
      height: 701,
      // Slightly longer and later so it feels like the “main surface” settles last.
      enter: {
        durationMs: 900,
        delayMs: 80,
        fromY: 22,
        fromZ: 110,
        blurPx: 12,
        scaleFrom: 0.985,
      },
    },
  ],
}


