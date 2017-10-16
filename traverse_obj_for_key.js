function traverse (x, find_key) {
  if (isArray(x)) {
    traverseArray(x)
  } else if ((typeof x === 'object') && (x !== null)) {
    traverseObject(x, find_key)
  } else {

  }
}

function traverseArray (arr) {
  arr.forEach(function (x) {
    traverse(x)
  })
}

function traverseObject (obj, find_key) {
  for (var key in obj) {
    if(key === find_key){
      return obj[key]
    }else if (obj.hasOwnProperty(key)) {
      traverse(obj[key])
    }
  }
}

function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

// usage:
traverse(largeObject, 'some_key')