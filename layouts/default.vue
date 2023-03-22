<script setup lang="ts">
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

head.value.link?.forEach((link) => {
  const url = new URL(link.href)
  if (!url.pathname.endsWith('/')) {
    url.pathname = `${url.pathname}/`
    link.href = url.href
  }
})
</script>

<template>
  <div>
    <Html :lang="head.htmlAttrs?.lang" :dir="head.htmlAttrs?.dir">
      <Head>
        <template v-for="link in head.link" :key="link.id">
          <Link
            :id="link.id"
            :rel="link.rel"
            :href="link.href"
            :hreflang="link.hreflang"
          />
        </template>

        <template v-for="meta in head.meta" :key="meta.id">
          <Meta
            :id="meta.id"
            :property="meta.property"
            :content="meta.content"
          />
        </template>
      </Head>
      <Body>
        <VitePwaManifest />
        <the-header />
        <center-wrapper>
          <main class="main">
            <slot />
          </main>
        </center-wrapper>
        <pwa-update />
      </Body>
    </Html>
  </div>
</template>

<style lang="postcss" scoped>
.main {
  margin-block: 5em 8em;
}
</style>
