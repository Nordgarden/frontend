<script lang="ts" setup>
defineProps<{
  error: Error
}>()

const { t } = useI18n()

useHead({
  title: t('errors.error404')
})
</script>

<template>
  <NuxtLayout>
    <div>
      <h1>404</h1>
      <p>{{ error }}</p>
    </div>
  </NuxtLayout>
</template>
