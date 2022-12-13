<script lang="ts" setup>
import IconAapple from "~/assets/icons/apple.svg";
import IconBars from "~/assets/icons/bars.svg";
import IconClose from "~/assets/icons/close.svg";
import IconFacebook from "~/assets/icons/facebook.svg";
import IconForwards from "~/assets/icons/forwards.svg";
import IconLinkedin from "~/assets/icons/linkedin.svg";
import IconPause from "~/assets/icons/pause.svg";
import IconPlay from "~/assets/icons/play.svg";
import IconRight from "~/assets/icons/chevron-right.svg";
import IconSpotify from "~/assets/icons/spotify.svg";
import IconTwitter from "~/assets/icons/twitter.svg";
import IconWaves from "~/assets/icons/waves.svg";
import IconYoutube from "~/assets/icons/youtube.svg";

const props = withDefaults(
  defineProps<{
    icon: string;
    size?: number;
    title?: string;
  }>(),
  {
    size: 24,
  }
);

const componenta = computed(() => {
  return `icon-${props.icon}`;
});
</script>

<template>
  <div>{{ componenta }}</div>
  <component :is="componenta" :width="size" :height="size" />
  <span class="sr-only" v-if="title">{{ title }}</span>
</template>
