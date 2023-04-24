<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
withDefaults(
  defineProps<{
    icon: string;
    size?: number;
    title?: string;
  }>(),
  {
    title: undefined,
    size: 24,
  }
);
</script>

<template>
  <component
    :is="`svgo-${icon}`"
    :width="size"
    :height="size"
    v-bind="$attrs"
    class="icon"
  />
  <span v-if="title" class="sr-only">{{ title }}</span>
</template>

<style lang="postcss" scoped>
.icon {
  width: auto;
  height: auto;
  margin-bottom: 0;
}
</style>
