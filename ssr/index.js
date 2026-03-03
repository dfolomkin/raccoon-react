await import('ignore-styles')

await import('@babel/register').then(({ default: register }) => {
  register({
    ignore: [/(node_modules)/],
    presets: ['@babel/preset-env', '@babel/preset-react'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  })
})

await import('./server.js')
