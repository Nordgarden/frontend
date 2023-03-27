<script setup lang="ts">
  const head = useLocaleHead({
    addDirAttribute: true,
    identifierAttribute: "id",
    addSeoAttributes: true,
  });
</script>

<template>
  <div>
    <html
      :lang="head.htmlAttrs?.lang"
      :dir="head.htmlAttrs?.dir"
    >
      <head>
        <template
          v-for="link in head.link"
          :key="link.id"
        >
          <link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          >
        </template>

        <template
          v-for="meta in head.meta"
          :key="meta.id"
        >
          <meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          >
        </template>
      </head>
      <body>
        <vite-pwa-manifest />
        <the-header />
        <center-wrapper>
          <main class="main">
            <slot />
          </main>
        </center-wrapper>
        <pwa-update />
      </body>
    </html>
  </div>
</template>

<style lang="postcss" scoped>
  .main {
    margin-block: 5em 8em;
  }
</style>
