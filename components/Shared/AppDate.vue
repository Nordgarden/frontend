<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    date: string;
    format?: 'long' | 'short';
  }>(),
  {
    format: 'long'
  }
)
const dateTime = computed(() => {
  const date = new Date(props.date)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
})
</script>

<template>
  <time :datetime="dateTime">{{ $d(new Date(date), format) }}</time>
</template>
