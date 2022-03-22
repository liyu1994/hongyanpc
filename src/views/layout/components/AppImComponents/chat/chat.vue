<template>
  <div class="content">
    <div class="msg-container">
      <search />
      <friendlist />
    </div>
    <div class="chatbox">
      <message />
      <v-text />
    </div>
  </div>
</template>

<script>
import search from '../components/search/search'
import friendlist from '../components/friendlist/friendlist'
import message from '../components/message/message'
import vText from '../components/text/text'
export default {
  components: {
    search,
    friendlist,
    message,
    vText
  }
}
</script>

<style lang="stylus" scoped>
.content
  display: flex
  width: 880px
  .msg-container
    width: 245px
    height: 650px
    background: #E8E8E8
  .chatbox
    flex: 1
    height: 650px
</style>
