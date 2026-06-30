const server = require('../src/crawlerService');

before((done) => {
  server.listen(4567, done);
});

after((done) => {
  server.close(done);
});
