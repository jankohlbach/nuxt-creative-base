/* eslint-disable */
// @ts-nocheck

import gsap from 'gsap'
import { Draggable, InertiaPlugin } from 'gsap/all';

/*
This helper function makes a group of elements animate along the y-axis in a seamless, responsive loop.

Features:
  - Uses yPercent so that even if the heights change (like if the window gets resized), it should still work in most cases.
  - When each item animates to the top or bottom enough, it will loop back to the other side
  - Optionally pass in a config object with values like draggable: true, center: true, speed (default: 1, which travels at roughly 100 pixels per second), paused (boolean), repeat, reversed, and paddingBottom.
  - The returned timeline will have the following methods added to it:
    - next() - animates to the next element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
    - previous() - animates to the previous element using a timeline.tweenTo() which it returns. You can pass in a vars object to control duration, easing, etc.
    - toIndex() - pass in a zero-based index value of the element that it should animate to, and optionally pass in a vars object to control duration, easing, etc. Always goes in the shortest direction
    - current() - returns the current index (if an animation is in-progress, it reflects the final index)
    - times - an Array of the times on the timeline where each element hits the "starting" spot. There's also a label added accordingly, so "label1" is when the 2nd element reaches the start.
 */
export const loopVertically = (items, config): gsap.core.Timeline => {
  let timeline
  items = gsap.utils.toArray(items)
  config = config || {}
  gsap.context(() => { // use a context so that if this is called from within another context or a gsap.matchMedia(), we can perform proper cleanup like the "resize" event handler on the window
    let onChange = config.onChange,
      lastIndex = 0,
      tl = gsap.timeline({ data: { reversed: false }, repeat: config.repeat, onUpdate: onChange && function () {
        const i = tl.closestIndex()
        if (lastIndex !== i) {
          lastIndex = i
          onChange(items[i], i)
        }
      }, paused: config.paused, defaults: { ease: 'none' }, onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100) }),
      length = items.length,
      startY = items[0].offsetTop,
      times = [],
      heights = [],
      spaceBefore = [],
      yPercents = [],
      curIndex = 0,
      indexIsDirty = false,
      center = config.center,
      pixelsPerSecond = (config.speed || 1) * 100,
      snap = config.snap === false ? v => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if height is 20% the first element's height might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
      timeOffset = 0,
      container = center === true ? items[0].parentNode : gsap.utils.toArray(center)[0] || items[0].parentNode,
      totalHeight,
      getTotalHeight = () => items[length - 1].offsetTop + yPercents[length - 1] / 100 * heights[length - 1] - startY + spaceBefore[0] + items[length - 1].offsetHeight * gsap.getProperty(items[length - 1], 'scaleY') + (parseFloat(config.paddingBottom) || 0),
      populateHeights = () => {
        let b1 = container.getBoundingClientRect(), b2
        items.forEach((el, i) => {
          heights[i] = parseFloat(gsap.getProperty(el, 'height', 'px'))
          yPercents[i] = snap(parseFloat(gsap.getProperty(el, 'y', 'px')) / heights[i] * 100 + gsap.getProperty(el, 'yPercent'))
          b2 = el.getBoundingClientRect()
          spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top)
          b1 = b2
        })
        gsap.set(items, { // convert "y" to "yPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
          yPercent: i => yPercents[i],
        })
        totalHeight = getTotalHeight()
      },
      timeWrap,
      populateOffsets = () => {
        timeOffset = center ? tl.duration() * (container.offsetHeight / 2) / totalHeight : 0
        center && times.forEach((t, i) => {
          times[i] = timeWrap(tl.labels['label' + i] + tl.duration() * heights[i] / 2 / totalHeight - timeOffset)
        })
      },
      getClosest = (values, value, wrap) => {
        let i = values.length,
          closest = 1e10,
          index = 0, d
        while (i--) {
          d = Math.abs(values[i] - value)
          if (d > wrap / 2) {
            d = wrap - d
          }
          if (d < closest) {
            closest = d
            index = i
          }
        }
        return index
      },
      populateTimeline = () => {
        let i, item, curY, distanceToStart, distanceToLoop
        tl.clear()
        for (i = 0; i < length; i++) {
          item = items[i]
          curY = yPercents[i] / 100 * heights[i]
          distanceToStart = item.offsetTop + curY - startY + spaceBefore[0]
          distanceToLoop = distanceToStart + heights[i] * gsap.getProperty(item, 'scaleY')
          tl.to(item, { yPercent: snap((curY - distanceToLoop) / heights[i] * 100), duration: distanceToLoop / pixelsPerSecond }, 0)
            .fromTo(item, { yPercent: snap((curY - distanceToLoop + totalHeight) / heights[i] * 100) }, { yPercent: yPercents[i], duration: (curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond, immediateRender: false }, distanceToLoop / pixelsPerSecond)
            .add('label' + i, distanceToStart / pixelsPerSecond)
          times[i] = distanceToStart / pixelsPerSecond
        }
        timeWrap = gsap.utils.wrap(0, tl.duration())
      },
      refresh = (deep) => {
        const progress = tl.progress()
        tl.progress(0, true)
        populateHeights()
        deep && populateTimeline()
        populateOffsets()
        deep && tl.draggable && tl.paused() ? tl.time(times[curIndex], true) : tl.progress(progress, true)
      },
      onResize = () => refresh(!(tl.draggable && tl.draggable.isDragging)),
      proxy
    gsap.set(items, { y: 0 })
    populateHeights()
    populateTimeline()
    populateOffsets()
    window.addEventListener('resize', onResize)
    function toIndex(index, vars) {
      vars = vars || {};
      (Math.abs(index - curIndex) > length / 2) && (index += index > curIndex ? -length : length) // always go in the shortest direction
      let newIndex = gsap.utils.wrap(0, length, index),
        time = times[newIndex]
      if (time > tl.time() !== index > curIndex && index !== curIndex) { // if we're wrapping the timeline's playhead, make the proper adjustments
        time += tl.duration() * (index > curIndex ? 1 : -1)
      }
      if (time < 0 || time > tl.duration()) {
        vars.modifiers = { time: timeWrap }
      }
      curIndex = newIndex
      vars.overwrite = true
      gsap.killTweensOf(proxy)
      return vars.duration === 0 ? tl.time(timeWrap(time)) : tl.tweenTo(time, vars)
    }
    tl.toIndex = (index, vars) => toIndex(index, vars)
    tl.closestIndex = (setCurrent) => {
      const index = getClosest(times, tl.time(), tl.duration())
      if (setCurrent) {
        curIndex = index
        indexIsDirty = false
      }
      return index
    }
    tl.current = () => indexIsDirty ? tl.closestIndex(true) : curIndex
    tl.next = vars => toIndex(tl.current() + 1, vars)
    tl.previous = vars => toIndex(tl.current() - 1, vars)
    tl.times = times
    tl.progress(1, true).progress(0, true) // pre-render for performance
    if (config.reversed) {
      tl.vars.onReverseComplete()
      tl.reverse()
      tl.data.reversed = true;
    }
    tl.closestIndex(true)
    lastIndex = curIndex
    onChange && onChange(items[curIndex], curIndex)
    timeline = tl
    return () => window.removeEventListener('resize', onResize) // cleanup
  })
  return timeline
}
