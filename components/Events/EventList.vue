<script lang="ts" setup>
import { IEvent } from "~~/types/IEvent";

const { keys } = useEvents();

const isLoading = useState<boolean>(keys.isLoading);
const events = useState<IEvent[]>(keys.events);
</script>

<template>
  <app-loader v-if="isLoading" />
  <template v-else>
    <ul
      v-if="events.length"
      class="list"
    >
      <event-item
        v-for="event in events"
        :key="event.date.toString()"
        :event="event"
      />
    </ul>
    <p v-else>
      {{ $t("noTourDays") }}
    </p>
  </template>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
}
</style>
