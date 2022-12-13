<script setup lang="ts">
  const props = defineProps<{
    date: string;
  }>();
</script>

<template>
  <app-date :date="date" class="date" />
</template>

<style lang="postcss" scoped>
  .date {
    font-size: var(--font-size-sm);
    color: var(--color-gray);
    margin-bottom: var(--spacing-m);
    display: block;
  }
</style>
