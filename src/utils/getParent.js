export default function getParent(el, offset) {
  let offsetParent = el
  
  for(var i = 1; i <= offset; ++i) {
    offsetParent = offsetParent.parentNode
  }

  return offsetParent
}