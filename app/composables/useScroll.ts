// TODO: maybe more performant to access $lenis directly
export const useScroll = () => {
  return useState('scroll', () => ({
    scrollY: 0,
  }))
}
