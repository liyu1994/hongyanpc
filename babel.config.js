// module.exports = {
//   // presets: [
//   //   '@vue/app'
//   //   // '@vue/cli-plugin-babel/preset'
//   // ],
//   presets: [['@vue/app', { useBuiltIns: 'entry' }]],
//   sourceType: 'unambiguous'
// }

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const plugins = []
if (IS_PROD) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    ['@vue/app',
      {
        polyfills: [
          'es6.promise',
          'es6.symbol'
        ],
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins,
  sourceType: 'unambiguous'
}
