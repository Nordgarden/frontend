<script lang="ts" setup>
import { Ref } from 'vue'
const down: Ref<number | null> = ref(null)

const emit = defineEmits(['click'])

const mouseDown = (event: { target: Element }) => {
  if (event.target.nodeName === 'A') {
    down.value = null
  } else {
    down.value = +new Date()
  }
}
const mouseUp = () => {
  if (!down.value) {
    return
  }
  const up = +new Date()
  if (up - down.value < 200) {
    emit('click')
  }
}
</script>

<template>
  <li
    class="list-item"
    @mousedown.left="mouseDown"
    @mouseup.left="mouseUp"
  >
    <slot />
  </li>
</template>

<style lang="postcss" scoped>
.list-item {
  cursor: pointer;

  &:hover,
  &:focus-within {
    & :global(.read-more) {
      & :global(.icon) {
        margin-left: 0.25em;
      }
    }
  }
}
</style>
