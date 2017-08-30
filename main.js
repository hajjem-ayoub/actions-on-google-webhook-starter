exports.requestHandler = (req, res) => {
  console.log('main request handler called');
  res.send('hello world');
};