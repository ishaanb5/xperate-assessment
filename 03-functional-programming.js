function parse(inputArray) {
  // @TODO
  // 1. retrieve list from https://api.fliplet.com/v1/widgets/assets
  // note: you may need to use a CORS proxy
  // 2. parse the inputArray into a list of assets using the above list
  return new Promise((resolves) =>
    fetch(
      'https://cors-anywhere.herokuapp.com/https://api.fliplet.com/v1/widgets/assets',
    )
      .then((res) => res.json())
      .then((result) => {
        let assets = []

        inputArray.forEach((input) => {
          assets = [
            ...assets,
            ...result.assets[input].versions[
              result.assets[input].latestVersion
            ],
          ]
        })

        resolves(assets)
      })
      .catch(function (err) {
        console.log('Error', err.toString())
      }),
  )
}

parse([
  'bootstrap-css',
  'bootstrap-js',
  'jquery',
  'fliplet-core',
  'moment',
]).then(function (assets) {
  /*

assets is expected to be an array with the
following values in the same order as here:

[
"fonts/glyphicons-halflings-regular.ttf",
"fonts/glyphicons-halflings-regular.woff",
"fonts/glyphicons-halflings-regular.woff2",
'bootstrap-css.bundle.css',
'bootstrap-js.bundle.js',
'jquery.js',
'fliplet-core.bundle.css',
'fliplet-core.bundle.js',
'moment.min.js'
]

*/

  console.log('The list is', assets)
})
