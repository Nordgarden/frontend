<script setup lang="ts">
defineProps<{
  date: string;
}>();
</script>

<template>
  <app-date
    :date="date"
    class="date"
  />
</template>

<style lang="postcss" scoped>
.date {
  font-size: var(--font-size-sm);
  display: block;
  order: -1;
}
</style>
