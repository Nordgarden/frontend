<script setup>
const props = defineProps({
  error: Object,
});
</script>

<template>
  <the-header />
  <center-wrapper>
    <main class="main">
      <h1>404</h1>
      <p>{{ error }}</p>
    </main>
  </center-wrapper>
</template>

<style lang="postcss" scoped>
.main {
  margin-block: 5em 8em;
}
</style>
