export default function isObjectEmpty(obj) {
  if(typeof obj != 'object') {
    new Error('In function "isObjectEmpty" set not object value!')
    return
  }

  if(Object.keys(obj).length > 0) {
    return false
  } else {
    return true
  }
}