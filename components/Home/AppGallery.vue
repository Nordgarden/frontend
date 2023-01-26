<script lang="ts" setup>
  const images = [
    { name: "2", width: 640, height: 960 },
    { name: "3", width: 960, height: 640 },
    { name: "4", width: 960, height: 720 },
  ];
</script>

<template>
  <section class="gallery" aria-labelledby="gallery-title">
    <h1 id="gallery-title" class="sr-only">{{ $t("gallery") }}</h1>
    <div
      v-for="image in images"
      :key="image.name"
      :width="image.width"
      :height="image.height"
      :class="`item-${image.name}`"
      class="image-wrapper"
    >
      <img
        :src="`/media/images/${image.name}.jpg?nf_resize=fit&w=${image.width}&h=${image.height}`"
        :srcset="`/media/images/${image.name}.jpg?nf_resize=fit&w=${
          image.width * 1.5
        }&h=${image.height * 1.5} 2x`"
        loading="lazy"
        alt=""
      />
    </div>
  </section>
</template>

<style lang="postcss" scoped>
  @import "~/assets/css/media-queries/media-queries.css";

  .gallery {
    @mixin list-reset;

    display: grid;
    margin: var(--spacing-l) 0 var(--spacing-xl);
    grid-gap: var(--spacing-m);

    /* height: 80vh; */
    grid-template-areas:
      "photo-3 photo-3 photo-2  "
      "photo-4 photo-4 photo-4";
    grid-template-rows: repeat(2, 1fr);

    @media (--viewport-xlg) {
      grid-template-areas: "photo-3 photo-3 photo-2 photo-4 photo-4";
      grid-template-rows: 1fr;
    }
  }

  h1 {
    grid-area: title;
    align-self: end;
    margin-bottom: 0;
  }

  .item-1 {
    display: none;
    grid-area: photo-1;
  }

  .item-2 {
    grid-area: photo-2;
  }

  .item-3 {
    grid-area: photo-3;
  }

  .item-4 {
    grid-area: photo-4;
  }

  .item-5 {
    grid-area: photo-5;
  }

  .item-6 {
    grid-area: photo-6;
  }

  img {
    height: 40vw;
    display: block;
    object-fit: cover;
    width: 100%;

    @media (--viewport-xlg) {
      height: 20vw;
    }
  }
</style>
