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
      @click="$emit('go-to-page', page - 1)"
      class="btn previous"
      :to="
        localePath({
          query: {
            page: `${page - 1}`,
          },
        })
      "
      >Volgende pagina</nuxt-link
    >

    <nuxt-link
      v-if="page < totalPages"
      @click="$emit('go-to-page', page + 1)"
      class="btn next"
      :to="
        localePath({
          query: {
            page: `${page + 1}`,
          },
        })
      "
      >Volgende pagina</nuxt-link
    >
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
