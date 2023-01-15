var sampleData = {
  apps: [
    { id: 1, title: 'Lorem', published: true, userId: 123 },
    { id: 2, title: 'Ipsum', published: false, userId: 123 },
    { id: 3, title: 'Dolor', published: true, userId: 456 },
    { id: 4, title: 'Sit', published: true, userId: 789 },
    { id: 5, title: 'Amet', published: false, userId: 123 },
    { id: 6, title: 'Et', published: true, userId: 123 },
  ],
  organizations: [
    { id: 1, name: 'Google', suspended: true, userId: 123 },
    { id: 2, name: 'Apple', suspended: false, userId: 456 },
    { id: 3, name: 'Fliplet', suspended: false, userId: 123 },
  ],
}

// @TODO: This is the model/class you should work out

const select = (obj, key) => {
  return obj[key]
}

const where = (arr, filters) => {
  let data
  for (let [key, value] of Object.entries(filters)) {
    data = arr.filter((entry) => entry[key] === value)
  }

  return data
}

const attributes = (arr, filters) => {
  let data = []

  for (let entry of arr) {
    const newEntry = {}
    newEntry.id = entry.id
    for (let key of filters) {
      if (entry[key] === undefined) {
        throw new Error(`no ${key} attribute`)
      }
      newEntry[key] = entry[key]
    }

    data.push(newEntry)
  }

  return data
}

const sort = (arr, filters) => {
  let data = arr
  for (let key of Object.keys(filters)) {
    data.sort((entry1, entry2) => entry2[key] - entry1[key])
  }

  return data
}

function User(user) {
  this.id = user.id
}

User.prototype.select = function (collectionName) {
  this.select = collectionName
  return this
}

User.prototype.attributes = function (fieldsArr) {
  this.attributes = fieldsArr
  return this
}

User.prototype.where = function (filterArr) {
  this.where = filterArr
  return this
}

User.prototype.order = function (orderArr) {
  this.order = orderArr
  return this
}

User.prototype.findAll = function () {
  let arr = select(sampleData, this.select)
  if (this.where) {
    arr = where(arr, this.where)
  }
  arr = attributes(arr, this.attributes)
  arr = sort(arr, this.order)

  const promise = new Promise((resolve) => {
    resolve(arr)
  })

  return promise
}

User.prototype.findOne = function () {
  let arr = select(sampleData, this.select)
  if (this.where) {
    arr = where(arr, this.where)
  }
  arr = attributes(arr, this.attributes)
  arr = sort(arr, this.order)

  const promise = new Promise((resolve) => {
    resolve(arr[0])
  })

  return promise
}

// ------------------------------------------
// You shouldn't need to edit below this line

var user = new User({
  id: 123,
})

// Mimic what a ORM-like query engine would do by filtering the
// "sampleData" based on the query and the expected result example.
// Hint: lodash can be quite handly in dealing with this.
user
  .select('apps')
  .attributes(['id', 'title'])
  .where({ published: true })
  .order(['title'])
  .findAll()
  .then(function (apps) {
    // The expected result is for the "apps" array is:
    // [ { id: 6, title: 'Et' }, { id: 1, title: 'Lorem' } ]
    console.log(apps)
  })

user
  .select('organizations')
  .attributes(['name'])
  .where({ suspended: false })
  .findOne()
  .then(function (organization) {
    // The expected result is for the "organization" object is:
    // { id: 3, name: 'Fliplet' }
    console.log(organization)
  })
