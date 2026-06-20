module.exports = function configureBabel(api) {
  const isEsm = api.env('esm')

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: isEsm ? { esmodules: true } : { node: '12' },
          modules: isEsm ? false : 'commonjs'
        }
      ],
      '@babel/preset-react'
    ]
  }
}
