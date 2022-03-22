import client from 'webpack-theme-color-replacer/client'
// import forElementUI from 'webpack-theme-color-replacer/forElementUI'
// 设置文件
import setting from '@/setting.js'

export default {
  namespaced: true,
  state: {
    // 颜色
    value: setting.theme.color
  },
  getters: {
    /**
     * 返回主题颜色
     * @param {Object} state vuex state
     */
    themeColor(state) {
      return state.value
    }
  },
  actions: {
    /**
     * @description 设置颜色
     * @param {Object} context
     * @param {String} color 尺寸
     */
    set({ state, dispatch, commit }, color) {
      return new Promise(async resolve => {
        // 记录上个值
        const old = state.value
        // store 赋值
        state.value = color || setting.theme.color
        // 持久化
        await dispatch('admin/db/set', {
          dbName: 'travel',
          path: 'color.value',
          value: state.value,
          user: true
        }, { root: true })
        // 应用
        commit('apply', {
          oldColor: old,
          newColor: state.value
        })
        // end
        resolve()
      })
    },
    /**
     * @description 从持久化数据读取主题颜色
     * @param {Object} context
     */
    load({ state, dispatch, commit }) {
      return new Promise(async resolve => {
        // 记录上个值
        const old = state.value
        // store 赋值
        state.theme = await dispatch('admin/db/get', {
          dbName: 'travel',
          path: 'color.value',
          defaultValue: setting.theme.color,
          user: true
        }, { root: true })
        // 应用
        commit('apply', {
          oldColor: old,
          newColor: state.value
        })
        // end
        resolve()
      })
    }
  },
  mutations: {
    /**
     * @description 将 vuex 中的主题颜色设置应用到系统中
     * @param {Object} context
     * @param {Object} payload oldColor {String} 旧的颜色
     * @param {Object} payload newColor {String} 新颜色
     */
    apply(state, { oldColor, newColor }) {
      function getThemeCluster(theme) {
        const tintColor = (color, tint) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)
          if (tint === 0) { // when primary color is in its rgb space
            return [red, green, blue].join(',')
          } else {
            red += Math.round(tint * (255 - red))
            green += Math.round(tint * (255 - green))
            blue += Math.round(tint * (255 - blue))
            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)
            return `#${red}${green}${blue}`
          }
        }
        const shadeColor = (color, shade) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)
          red = Math.round((1 - shade) * red)
          green = Math.round((1 - shade) * green)
          blue = Math.round((1 - shade) * blue)
          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)
          return `#${red}${green}${blue}`
        }
        const clusters = [theme]
        for (let i = 0; i <= 9; i++) {
          clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
        }
        clusters.push(shadeColor(theme, 0.1))
        return clusters
      }
      // console.log(forElementUI.getElementUISeries(newColor))
      var options = {
        // oldColors: [...forElementUI.getElementUISeries(oldColor)],
        // newColors: [...forElementUI.getElementUISeries(newColor), '#ff0000', '#ffff00'],
        oldColors: [...getThemeCluster(oldColor.replace('#', ''))],
        newColors: [...getThemeCluster(newColor.replace('#', ''))],
        changeUrl(cssUrl) {
          // const url = window.__theme_COLOR_cfg.url
          return process.env.NODE_ENV !== 'development' ? cssUrl : `/${cssUrl}`
        }
      }
      client.changer.changeColor(options)
    }
  }
}
