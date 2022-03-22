<template>
  <div
    class="admin-panel-search-item"
    :class="hoverMode ? 'can-hover' : ''"
    flex
  >
    <div
      class="admin-panel-search-item__icon"
      flex-box="0"
    >
      <div
        class="admin-panel-search-item__icon-box"
        flex="main:center cross:center"
      >
        <admin-icon
          v-if="item.icon"
          :name="item.icon"
        />
        <admin-icon-svg
          v-else-if="item.iconSvg"
          :name="item.iconSvg"
        />
        <admin-icon
          v-else
          name="file-o"
        />
      </div>
    </div>
    <div
      class="admin-panel-search-item__info"
      flex-box="1"
      flex="dir:top"
    >
      <div
        class="admin-panel-search-item__info-title"
        flex-box="1"
        flex="cross:center"
      >
        <span>{{ getLocale('menu_'+item.meta.langCode) }}</span>
      </div>
      <div
        class="admin-panel-search-item__info-fullTitle"
        flex-box="0"
      >
        <span> {{ getLocale('menu_'+item.fullTitle) }} / {{ getLocale('menu_'+item.meta.langCode) }}</span>
      </div>
      <div
        class="admin-panel-search-item__info-path"
        flex-box="0"
      >
        <span>{{ item.path }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocale } from '@/locales'
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    hoverMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getLocale
  }
}
</script>

<style lang="scss" scoped>
.admin-panel-search-item {
  height: 64px;
  margin: 0px -20px;
  &.can-hover {
    @extend %unable-select;
    margin: 0px;
    &:hover {
      background-color: #f5f7fa;
      .admin-panel-search-item__icon {
        .admin-panel-search-item__icon-box {
          i {
            font-size: 24px;
            color: $color-primary;
          }
        }
      }
      .admin-panel-search-item__info {
        .admin-panel-search-item__info-title {
          color: $color-text-main;
        }
        .admin-panel-search-item__info-fullTitle {
          color: $color-text-normal;
        }
        .admin-panel-search-item__info-path {
          color: $color-text-normal;
        }
      }
    }
  }
  .admin-panel-search-item__icon {
    width: 64px;
    .admin-panel-search-item__icon-box {
      height: 64px;
      width: 64px;
      border-right: 1px solid $color-border-3;
      i {
        font-size: 20px;
        color: $color-text-sub;
      }
      svg {
        height: 20px;
        width: 20px;
      }
    }
  }
  .admin-panel-search-item__info {
    margin-left: 10px;
    .admin-panel-search-item__info-title {
      font-size: 16px;
      line-height: 16px;
      font-weight: bold;
      color: $color-text-normal;
    }
    .admin-panel-search-item__info-fullTitle {
      font-size: 10px;
      line-height: 14px;
      color: $color-text-placehoder;
    }
    .admin-panel-search-item__info-path {
      margin-bottom: 4px;
      font-size: 10px;
      line-height: 14px;
      color: $color-text-placehoder;
    }
  }
}
</style>
