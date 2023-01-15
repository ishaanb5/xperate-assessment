var ExpressBrute = require('express-brute')

var store = new ExpressBrute.MemoryStore() // stores state locally, don't use this in production

const namespaces = {}

const bruteforce = (key, maxRetries, waitTime) => {
  namespaces[key] = new ExpressBrute(store, {
    freeRetries: maxRetries,
    minWait: waitTime,
  })
  return (req, res, next) => {
    namespaces[key].prevent(req, res, next)
    next()
  }
}
module.exports = { bruteforce }
