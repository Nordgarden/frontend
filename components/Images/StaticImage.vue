<script lang="ts" setup>
import { ComputedRef } from 'vue'

const props = defineProps<{
    image: string;
    alt?: string;
    lazy: boolean;
    sizes?: string;
  }>()
const generateImage = (format: string, size: number) => {
  return `/images/${props.image}-${size}.${format} ${size}w`
}

const imageSizes = [512, 384, 256]
const srcset: ComputedRef<{ avif: string; webp: string }> = computed(() => {
  const imageSizesWebP = imageSizes.map((size) => {
    return generateImage('webp', size)
  })
  const imageSizesAvif = imageSizes.map((size) => {
    return generateImage('avif', size)
  })
  return {
    webp: imageSizesWebP.join(','),
    avif: imageSizesAvif.join(',')
  }
})

const src: ComputedRef<string> = computed(() => {
  return generateImage('webp', imageSizes[0])
})
</script>

<template>
  <picture>
    <source
      type="image/avif"
      :srcset="srcset.avif"
      :sizes="sizes"
    >
    <app-image
      :src="src"
      :srcset="srcset.webp"
      :sizes="sizes"
      :lazy="lazy"
      :alt="alt"
      class="image"
      :width="imageSizes[0]"
      :height="imageSizes[0]"
    />
  </picture>
</template>
