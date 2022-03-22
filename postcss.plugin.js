const postcss = require('postcss')

// module.exports = postcss.plugin('postcss-global-namespace', opts => {
//   opts = opts || {}
//   const globalClsName = opts.hasOwnProperty('globalClsName') && opts.globalClsName
//   // const globalClsName = '.sys-app'
//   return root => {
//     root.walk(node => {
//       const selectorArr = (node.selector || '').split(',')
//       return node.selector = ((selectorArr || []).map((itm) => {
//         if (itm.match(/^(\s*)(html|body)(\s*)$/)) {
//           return itm
//         }
//         return globalClsName + ' ' + itm
//       }).join(','))
//     })
//   }
// })

module.exports = postcss.plugin('namespace', () => css =>
  css.walkRules(rule => {
    if (rule.parent && rule.parent.type === 'atrule' && rule.parent.name !== 'media') return
    rule.selectors = rule.selectors.map(s => `.sys-app ${s === 'body' ? '' : s}`)
  })
)
