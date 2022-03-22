import router from '@/router'

/**
 * @description i18n
 */
export function getLocale(title) {
  const hasKey = router.app.$te(title)
  if (hasKey) {
    const translatedTitle = router.app.$t(title)
    if (translatedTitle) {
      return translatedTitle
    }
  }
  return router.app.$tc(title, 1, 'zh_cn')
}
