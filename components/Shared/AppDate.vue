<script setup lang="ts">
  const props = defineProps<{
    date: string;
  }>();
  const dateTime = computed(() => {
    const date = new Date(props.date);
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  });
</script>

<template>
  <time :datetime="dateTime">{{ $d(new Date(date), "short") }}</time>
</template>
