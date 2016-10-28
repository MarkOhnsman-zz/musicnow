let JsData = require('js-data'),
    uuid = require('node-uuid'),
    Schemator = require('js-data-schema'),
    FBAdapter = require('js-data-firebase'),
    schemator = new Schemator(),
    DS = new JsData.DS();

let fbAdapter = new FBAdapter({
  basePath: 'https://my-musical-life.firebaseio.com/'
})

function formatQuery(query){
  query = query || ''
  return {
    with: query.split(',').join(' ').split(' ')
  }
}

DS.registerAdapter('firebase', fbAdapter, { default: true })

module.exports = {
  DS,
  uuid,
  schemator,
  formatQuery
}