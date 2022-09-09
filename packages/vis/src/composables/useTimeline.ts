import { 
  computed, 
  onMounted, 
  onUnmounted, 
  ref, 
  watch 
} from 'vue-demi'

import type { Ref } from 'vue-demi'

import { MaybeElementRef } from '@vueuse/core'

import { resolveUnref } from '@vueuse/core'

import type { 
  DataItem, 
  DataGroup, 
  TimelineOptions, 
  TimelineAnimationOptions, 
  TimelineEventPropertiesResult 
} from "vis-timeline/esnext"

import { Timeline } from "vis-timeline/esnext"

export interface UseTimelineParams {
  /**
   * 
   * 
   * Items for the Timeline.
   * 
   */
  items: DataItem[]
  /**
   * 
   * 
   * Groups for the Timeline.
   * 
   */
  groups?: DataGroup[]
  /**
   * 
   * 
   * Timeline options.
   * 
   */
   options?: TimelineOptions
  /**
   * 
   * 
   * 
   * 
   */
  currentTime?: Ref<Date | string>
  /**
   * 
   * 
   * Timeline selections
   * 
   */
  selection?: Ref<string[] | string>
}

export const useTimeline = (
  el: MaybeElementRef<HTMLElement | undefined>,
  params: UseTimelineParams
) => {
  const timeline = ref<null | Timeline>(null)

  const selection = ref<string[] | string>(params.selection?.value || [])

  const setSelection = (s: string[] | string) => {
    if (!timeline.value) return
    selection.value = s
    timeline.value.setSelection(s)
  }

  watch(selection, () => {
    if (!timeline.value || !selection.value) return
    timeline.value.setSelection(selection.value)
  })

  const items = ref<DataItem[]>(params.items)

  watch(items, (newItemsValue, prevItemsValue) => {
    if (!timeline.value) return
    timeline.value.setItems(newItemsValue)
  }, {
    deep: true
  })

  const setItems = (i: DataItem[]) => {
    if (!timeline.value) return
    items.value = i
  }

  const groups = ref<DataGroup[]>(params.groups || [])

  watch(groups, (newGroupsValue, oldGroupsValue) => {
    if (!timeline.value) return
    timeline.value.setGroups(newGroupsValue)
  }, {
    deep: true
  })

  const setGroups = (g: DataGroup[]) => {
    if (!timeline.value) return
    groups.value = g
  }

  const options = ref(params.options)

  const setOptions = (options: TimelineOptions) => {
    if (!timeline.value) return
    timeline.value.setOptions(options)
  }

  const currentTime = ref<Date | string>(params.currentTime?.value || new Date())

  watch(currentTime, (newCurrentTime, prevCurrentTime) => {
    if (!timeline.value) return
    timeline.value.setCurrentTime(newCurrentTime)
  })

  /**
   * 
   * Add new vertical bar representing a custom time that can be dragged by the user.
   * 
   * @param time 
   * @param id 
   * @returns 
   */
  const addCustomTime = (time: Date, id: string) => {
    if (!timeline.value) return
    return timeline.value.addCustomTime(time, id);
  }

  /**
   * 
   * Adjust the visible window such that it fits all items. See also focus(id).
   * 
   */
  const fit = () => {
    if (!timeline.value) return
    timeline.value.fit()
  }

  /**
   * 
   * Adjust the visible window such that the selected item (or multiple items) are centered on screen.
   * 
   * @param id 
   * @param options 
   * @returns 
   */
  const focus = (id: string, options: TimelineAnimationOptions) => {
    if (!timeline.value) return
    timeline.value.focus(id, options)
  }

  /**
   * 
   * Get the current time. Only applicable when option showCurrentTime is true.

   * @returns the current time, of type Date.
   * 
   */
  const getCurrentTime = () => {
    if (!timeline.value) return
    return timeline.value.getCurrentTime()
  }

  /**
   * 
   * Retrieve the custom time from the custom time bar with given id.
   * 
   * @param id 
   * @returns the custom time, of type Date.
   */
  const getCustomTime = (id: string) => {
    if (!timeline.value) return
    return timeline.value.getCustomTime(id)
  }

  const getEventProperties = (event: Event): TimelineEventPropertiesResult | undefined => {
    if (!timeline.value) return
    return timeline.value.getEventProperties(event)
  }

  const getItemRange = () => {
    if (!timeline.value) return
    return timeline.value.getItemRange()
  }

  const getSelection = () => {
    if (!timeline.value) return
    return timeline.value.getSelection()
  }

  const getVisibleItems = () => {
    if (!timeline.value) return
    return timeline.value.getVisibleItems()
  }

  /**
   * 
   * Get the current visible window.
   *
   */
  const getWindow = () => {
    if (!timeline.value) return
    return timeline.value.getWindow()
  }

  /**
   * 
   * Move the window such that given time is centered on screen.
   * 
   * @param time 
   * @param options
   * 
   */
  const moveTo = (time: Date, options: TimelineAnimationOptions) => {
    if (!timeline.value) return
    timeline.value.moveTo(time, options);
  }

  /**
   * 
   * Force a redraw of the Timeline. The size of all items will be 
   * recalculated. Can be useful to manually redraw when option 
   * autoResize=false and the window has been resized, or when 
   * the items CSS has been changed.
   * 
   */
  const redraw = () => {
    if (!timeline.value) return
    timeline.value.redraw()
  }

  /**
   * 
   * Remove vertical bars previously added to the timeline via addCustomTime method.
   * 
   * @param id — ID of the custom vertical bar returned by addCustomTime method.
   * 
   */
  const removeCustomTime = (id: string) => {
    if (!timeline.value) return
    timeline.value.removeCustomTime(id);
  }

  /**
   * 
   * Set a current time. This can be used for example to ensure that a client's 
   * time is synchronized with a shared server time. Only applicable when 
   * option showCurrentTime is true.
   * 
   */
  const setCurrentTime = (time: Date | string) => {
    if (!timeline.value) return
    timeline.value.setCurrentTime(time);
  }

  /**
   * 
   * Adjust the time of a custom time bar.
   * 
   * @param time — The time the custom time bar should point to
   * @param id — Id of the custom time bar, and is undefined by default.
   * 
   */
  const setCustomTime = (time: Date | string, id: string) => {
    if (!timeline.value) return
    timeline.value.setCustomTime(time, id);
  }

  /**
   * 
   * Adjust the title attribute of a custom time bar.
   * 
   * @param title — The title shown when hover over time bar
   * @param id — Id of the custom time bar, and is undefined by default.
   * 
   */
  const setCustomTimeTitle = (title: string, id: string) => {
    if (!timeline.value) return
    timeline.value.setCustomTimeTitle(title, id);
  }

  onMounted(() => {
    const element = resolveUnref(el)

    if (!element) return

    timeline.value = new Timeline(element, items.value)

    if (groups.value && groups.value.length > 0) {
      setGroups(groups.value)
    }

    if (options.value) {
      setOptions(options.value)
    }

    if (selection.value) {
      setSelection(selection.value)
    }
  })

  onUnmounted(() => {
    if (timeline.value) {
      // To avoid any memory leaks:
      timeline.value.destroy()
    }

    timeline.value = null
  })

  return {
    timeline,
    // Timeline Selection:
    selection,
    setSelection,
    // Timeline Items:
    items,
    setItems,
    // Timeline Groups:
    groups,
    setGroups,
    // Timeline Options:
    options,
    setOptions,
    // Timeline Methods:
    addCustomTime,
    fit,
    focus,
    getCurrentTime,
    getCustomTime,
    getEventProperties,
    getItemRange,
    getSelection,
    getVisibleItems,
    getWindow,
    moveTo,
    redraw,
    removeCustomTime,
    setCurrentTime,
    setCustomTime,
    setCustomTimeTitle 
  }
}