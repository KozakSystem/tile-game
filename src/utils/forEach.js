export default function forEach(ctx, callback) {
  Array.prototype.forEach.call(ctx, function(el, i) {
    callback(el, i)
  }) 
}