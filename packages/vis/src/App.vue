<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { Timeline } from './components'

import {
  DataSet
} from 'vis-data'

import {
  TimelineEvents,
  TimelineOptions,
} from 'vis-timeline/esnext';

const items = [
  {
    id: 2,
    group: 0,
    content: "item 2",
    start: "2014-04-14"
  },
  {
    id: 3,
    group: 0,
    content: "item 3",
    start: "2014-04-18"
  },
  {
    id: 1,
    group: 0,
    content: "item 1",
    start: "2014-04-20"
  },
  {
    id: 4,
    group: 0,
    content: "item 4",
    start: "2014-04-16",
    end: "2014-04-19"
  },
  {
    id: 5,
    group: 0,
    content: "item 5",
    start: "2014-04-25"
  },
  {
    id: 6,
    group: 0,
    content: "item 6",
    start: "2014-04-27",
    type: "point"
  }
]

const options = {} as TimelineOptions;

const handleClick = (event: TimelineEvents) => {
  console.log(event)
}
</script>

<template>
  <Timeline 
    :items="items"
    :options="options"
    @click="handleClick"
  />
</template>
