<script setup lang="ts">
import { IPlayableSong } from '~~/types/ISong'

const { next, setMetaData, setMediaSessionEventListeners, keys } = useAudio()
const preload = ref('none')

const isPlaying = useState<boolean>(keys.isPlaying)
const currentSong = useState<IPlayableSong>(keys.currentSong)
const player = useState<HTMLAudioElement | null>(keys.player)
const progress = useState<number>(keys.progress)

const userHasFastConnection = () => {
  const connection = window.navigator.connection
  if (!connection) { return false }
  if (!connection.effectiveType) { return false }

  const slowConnections = ['slow-2g', '2g', '3g']
  return !slowConnections.includes(connection.effectiveType)
}

const setPreloadOnFastConnection = () => {
  if (userHasFastConnection()) {
    preload.value = 'auto'
  } else {
    preload.value = 'none'
  }
}

onMounted(() => {
  setPreloadOnFastConnection()
  setMediaSessionEventListeners()
  setMetaData()
})

const setPlayState = (state: boolean) => {
  isPlaying.value = state
}

const timeupdate = () => {
  if (!player.value) {
    return 0
  }
  progress.value = (player.value.currentTime / player.value.duration) * 100
}
</script>

<template>
  <audio
    v-if="currentSong"
    ref="player"
    :src="currentSong.file"
    :preload="preload"
    type="audio/mp3"
    @timeupdate="timeupdate"
    @ended="next"
    @play="setPlayState(true)"
    @pause="setPlayState(false)"
  />
</template>
