<script lang="ts" setup>
defineProps<{
  amount: number;
}>();
</script>

<template>
  <span v-if="amount > 0" class="badge">{{ amount }}</span>
</template>

<style lang="postcss" scoped>
.badge {
  font-size: var(--font-size-sm);
  background: var(--color-black);
  min-width: 1.5em;
  height: 1.5em;
  border-radius: 1.5em;
  transform: translate3d(var(--spacing-xxs), 0, 0);
  flex: 0 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
}
</style>
