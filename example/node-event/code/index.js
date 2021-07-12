module.exports.handler = function(event, context, callback) {
  console.log(event.toString());
  // console.dir(context);
  console.log('hello world222');
  console.log('hello world333');
  callback(null, 'hello world');
};
