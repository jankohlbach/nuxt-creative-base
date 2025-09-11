export const useInview = () => {
  const inviewTrigger = useState<NodeList | null>('inviewTrigger', () => null)

  const setInviewTrigger = () => {
    inviewTrigger.value = document.querySelectorAll('[data-inview]')
  }

  return {
    inviewTrigger,
    setInviewTrigger,
  }
}
