<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<script lang="ts" setup>
  import IconApple from "~/assets/icons/apple.svg";
  import IconBars from "~/assets/icons/bars.svg";
  import IconClose from "~/assets/icons/close.svg";
  import IconChevronRight from "~/assets/icons/chevron-right.svg";
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

  const iconComponent = computed(() => {
    switch (props.icon) {
      case "apple":
        return IconApple;
      case "bars":
        return IconBars;
      case "close":
        return IconClose;
      case "chevron-right":
        return IconChevronRight;
      case "facebook":
        return IconFacebook;
      case "forwards":
        return IconForwards;
      case "linkedin":
        return IconLinkedin;
      case "pause":
        return IconPause;
      case "play":
        return IconPlay;
      case "right":
        return IconRight;
      case "spotify":
        return IconSpotify;
      case "twitter":
        return IconTwitter;
      case "waves":
        return IconWaves;
      case "youtube":
        return IconYoutube;
    }
  });
</script>

<template>
  <component :is="iconComponent" :width="size" :height="size" v-bind="$attrs" />
  <span class="sr-only" v-if="title">{{ title }}</span>
</template>
