var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var config = require('./webpack.common')

// here is the local server
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3001, 'localhost', (err, result) => {
  if (err) console.log(err)
  console.log('Listening at localhost:3001')
})
