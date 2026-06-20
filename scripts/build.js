var execSync = require('child_process').execSync
var readFileSync = require('fs').readFileSync

function exec(command) {
  execSync(command, { stdio: [ 0, 1, 2 ] })
}

async function main() {
  var prettyBytes = (await import('pretty-bytes')).default
  var gzipSizeSync = (await import('gzip-size')).gzipSizeSync

  exec('npm run build')

  console.log(
    '\ngzipped, the UMD build is ' + prettyBytes(
      gzipSizeSync(readFileSync('umd/ReactTitleComponent.min.js'))
    )
  )
}

main().catch(function handleError(error) {
  console.error(error)
  process.exit(1)
})
