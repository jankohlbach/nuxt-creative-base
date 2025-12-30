/**
 * Calculate fluid values using the same logic as CSS clamp-fluid function
 * Mirrors the behavior of the SCSS clamp-fluid mixin
 */

// Fluid breakpoint constants (matching CSS variables)
const FLUID_MIN = 375
const FLUID_MAX = 1720

export const clampFluid = (start: number, end: number, round: boolean = true): number => {
  if (!import.meta.client) {
    // Return middle value for SSR
    return round ? Math.round((start + end) / 2) : (start + end) / 2
  }

  const vw = window.innerWidth

  // Clamp the viewport width between min and max
  const clampedVw = Math.max(FLUID_MIN, Math.min(FLUID_MAX, vw))

  // Calculate the fluid value using linear interpolation
  const progress = (clampedVw - FLUID_MIN) / (FLUID_MAX - FLUID_MIN)
  const fluidValue = start + (end - start) * progress

  return round ? Math.round(fluidValue) : fluidValue
}
