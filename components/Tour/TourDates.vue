<script lang="ts" setup>
import { IEvent } from "~~/types/IEvent";
import { Ref } from "vue";

const { keys } = useEvents();

const isLoading = useState<boolean>(keys.isLoading);
const events = useState<IEvent[]>(keys.events);
const { d } = useI18n();
</script>

<template>
  <app-loader v-if="isLoading" />
  <template v-else>
    <ul v-if="events.length" class="list">
      <li v-for="event in events" :key="event.date">
        <span class="date">{{ d(event.date, "short") }}</span>
        <div>
          <span class="venue">{{ event.venue }}</span>
          <span class="city">{{ event.city }}</span>
        </div>
      </li>
    </ul>
    <p v-else>{{ $t("noTourDays") }}</p>
  </template>
</template>

<style lang="postcss" scoped>
.list {
  @mixin list-reset;
}

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
  color: var(--color-primary);
}
</style>
