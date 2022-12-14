import { defineComponent, defineEmits, h, onMounted, ref } from 'vue-demi';

import type { PropType } from 'vue-demi';

import type {
  DataItem,
  DataGroup,
  DataGroupCollectionType,
  TimelineEvents,
  TimelineOptions,
} from 'vis-timeline/esnext';

import { useTimeline } from '../composables/useTimeline';

export const Timeline = defineComponent({
  name: 'Timeline',
  props: {
    items: {
      type: Array as PropType<DataItem[]>,
      required: true,
    },
    groups: {
      type: Array as PropType<DataGroup[]>,
      required: false,
      default: () => {
        return [] as DataGroupCollectionType;
      },
    },
    currentTime: {
      type: Date as PropType<Date>,
      required: false,
      default: () => {
        return new Date();
      },
    },
    options: {
      type: Object as PropType<TimelineOptions>,
      required: false,
      default: () => {
        return {} as TimelineOptions;
      },
    },
    events: {
      type: Array as PropType<TimelineEvents[]>,
      required: false,
      default: () => [
        'click',
        'contextmenu',
        'currentTimeTick',
        'doubleClick',
        'drop',
        'mouseOver',
        'mouseDown',
        'mouseUp',
        'mouseMove',
        'groupDragged',
        'changed',
        'rangechange',
        'rangechanged',
        'select',
        'itemover',
        'itemout',
        'timechange',
        'timechanged',
      ],
    },
  },
  setup(props, { emit }) {
    const visualization = ref<HTMLElement>();

    const {
      timeline,
      selection,
      setSelection,
      items,
      setItems,
      groups,
      setGroups,
      options,
      setOptions,
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
      setCustomTimeTitle,
    } = useTimeline(visualization, {
      items: props.items,
      groups: props.groups,
      options: props.options,
      currentTime: ref(props.currentTime),
    });
    
    onMounted(() => {
      if (!timeline.value) return;
      
      props.events.forEach((event) => {
        timeline.value?.on(event, (props) => emit(event, props));
      });
    });

    return {
      visualization,
      timeline,
      selection,
      setSelection,
      items,
      setItems,
      groups,
      setGroups,
      options,
      setOptions,
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
      setCustomTimeTitle,
    }
  },
  render() {
    return h('div', { ref: 'visualization' });
  },
})