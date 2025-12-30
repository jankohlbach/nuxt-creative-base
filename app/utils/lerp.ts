/**
 * Linear interpolation between two values
 */
export const lerp = (start: number, end: number, damping: number) => start * (1 - damping) + end * damping
