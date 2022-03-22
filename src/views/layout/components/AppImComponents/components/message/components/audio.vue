<template>
  <div class="wrapper">
    <audio ref="audio" :src="audioSrc" />
    <div class="audio-container" :style="{width:audioDuration+'px'}" @click="audioClick">
      <img class="audio-img" :src="audioStatus == 'pause' ? audioICon : audioGif" alt="">
      <span class="audio-time">{{ audioDuration }}"</span>
    </div>
  </div>
</template>

<script>
import audioICon from '../../../assets/images/im_audio_icon.png'
import audioGif from '../../../assets/images/im_audio_gif.gif'
export default {
  props: {
    audioSrc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      audioICon: audioICon,
      audioGif: audioGif,
      audioStatus: 'pause',
      audioDuration: 0
    }
  },
  mounted() {
    this.$refs['audio'].load()
    this.$refs['audio'].oncanplay = () => {
      this.audioDuration = this.$refs['audio'] ? parseInt(this.$refs['audio'].duration) : 0
    }
  },
  methods: {
    audioClick() {
      if (this.audioStatus === 'pause') {
        this.$refs['audio'].play()
        this.audioStatus = 'play' // 当前播放状态,记得修改图片
        this.$refs['audio'].addEventListener('ended', function() {
          this.$refs['audio'].pause()
          this.audioStatus = 'pause'
        })
      } else {
        this.$refs['audio'].pause()
        this.audioStatus = 'pause'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  .audio-container
    min-width: 80px;
    max-width: 150px;
    position relative
    img
      width: 19px
      height: 19px
      position: relative
      top: 3px
    .audio-time
      position: absolute
      right: -40px
      font-size: 12px
      color: #333333
</style>
