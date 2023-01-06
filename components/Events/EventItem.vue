<script lang="ts" setup>
  import { IEvent } from "~~/types/IEvent";

  defineProps<{
    event: IEvent;
  }>();
  const { d } = useI18n();
</script>

<template>
  <li>
    <span class="date">{{ d(event.date, "short") }}</span>
    <div>
      <span class="venue">{{ event.venue }}</span>
      <span class="city">{{ event.city }}</span>
    </div>
  </li>
</template>

<style lang="postcss" scoped>
  li {
    display: flex;
  }

  .date {
    flex: 0 0 var(--spacing-xl);
    text-align: right;
  }

  .city,
  .date,
  .venue {
    display: inline-block;
    margin-right: var(--spacing-xxs);
  }

  .venue {
    color: var(--color-black);
  }
</style>
