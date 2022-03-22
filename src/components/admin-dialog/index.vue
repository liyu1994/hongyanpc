<template>
  <el-dialog
    v-if="dragDialog"
    v-el-drag-dialog
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :append-to-body="true"
    :modal-append-to-body="true"
    :class="[{'setting-dialog': true}, dialogCss]"
    :top="top"
    :close-on-click-modal="clickModal"
    v-bind="$attrs"
    :visible.sync="visible"
    :before-close="cancel"
    :modal="modal"
    v-on="$listeners"
    @dragDialog="handleDrag"
  >
    <slot v-if="$slots.title" slot="title" name="title" />
    <slot />
    <slot v-if="$slots.footer" slot="footer" name="footer" />
  </el-dialog>
  <el-dialog
    v-else
    :title="title"
    :width="width"
    :fullscreen="fullscreen"
    :append-to-body="true"
    :modal-append-to-body="true"
    :class="[{'setting-dialog': true}, dialogCss]"
    :top="top"
    :close-on-click-modal="clickModal"
    v-bind="$attrs"
    :visible.sync="visible"
    :before-close="cancel"
    :modal="modal"
    v-on="$listeners"
  >
    <slot v-if="$slots.title" slot="title" name="title" />
    <slot />
    <slot v-if="$slots.footer" slot="footer" name="footer" />
  </el-dialog>
</template>

<script>
export default {
  name: 'AdminDialog',
  props: {
    title: {
      type: String,
      default: '提示'
    },
    top: {
      type: String,
      default: '15vh'
    },
    // 设置class
    dialogCss: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '500px'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    clickModal: {
      type: Boolean,
      default: false
    },
    modal: {
      type: Boolean,
      default: true
    },
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    cancel: {
      type: Function,
      required: false,
      default: () => {}
    },
    // 弹窗是否允许拖动，默认true
    dragDialog: {
      type: Boolean,
      default: false
    },
    handleDrag: {
      type: Function,
      required: false,
      default: () => {}
    }
  }
}
</script>
