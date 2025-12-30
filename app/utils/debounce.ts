/*
 * Classic debounce function to limit how often a function can fire
 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  func: T,
  timeout = 300,
) => {
  let timer: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}
