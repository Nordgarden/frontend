<script lang="ts" setup>
  const localePath = useLocalePath();
  defineProps<{
    totalPages: number;
    page: number;
  }>();

  defineEmits(["go-to-page"]);
</script>

<template>
  <div class="paging">
    <nuxt-link
      v-if="page > 1 && totalPages > 0"
      class="btn previous"
      :to="
        localePath({
          query: {
            page: `${page - 1}`,
          },
        })
      "
      @click="$emit('go-to-page', page - 1)"
    >
      {{ $t("paging.previous") }}
    </nuxt-link>

    <nuxt-link
      v-if="page < totalPages"
      class="btn next"
      :to="
        localePath({
          query: {
            page: `${page + 1}`,
          },
        })
      "
      @click="$emit('go-to-page', page + 1)"
    >
      {{ $t("paging.next") }}
    </nuxt-link>
  </div>
</template>

<style lang="postcss" scoped>
  .paging {
    display: flex;
    margin-bottom: 1em;
    justify-content: space-between;
  }

  .next {
    margin-left: auto;
  }
</style>
