export const useCanvas = () => {
  const canvasItems = useState<NodeListOf<HTMLElement> | null>('canvasItems', () => null)

  const setCanvasItems = () => {
    canvasItems.value = document.querySelectorAll('[data-canvas]')
  }

  return {
    canvasItems,
    setCanvasItems,
  }
}
