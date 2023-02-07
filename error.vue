<template>
  <button @click="handleError">Clear errors {{ error?.message }}</button>
</template>

<script setup lang="ts">
  const props = defineProps({
    error: Error,
  });

  const handleError = () => clearError({ redirect: "/" });
</script>
