/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       
*/

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', function(done){
     chai.request(server)
      .get('/api/books')
      .end(function(err, res){
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */

  suite('Routing tests', function() {


    suite('POST /api/books with title => create book object/expect book object', function() {
      
      test('Test POST /api/books with title', function(done) {
        let testData = {
          title: "book1"
        }

        chai
          .request(server)
          .post('/api/books')
          .send(testData)
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.property(data, 'title');
            assert.property(data, "_id");
            assert.strictEqual(data.title, "book1");
            done();
          })
      });
      
      test('Test POST /api/books with no title given', function(done) {
        chai
          .request(server)
          .post('/api/books')
          .send({})
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.strictEqual(data, 'missing required field title')
            done();
          })
      });
      
    });


    suite('GET /api/books => array of books', function(){
      
      test('Test GET /api/books',  function(done){
        chai 
          .request(server)
          .get('/api/books')
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            done();
          })
      });      
      
    });


    suite('GET /api/books/[id] => book object with [id]', function(){
      
      test('Test GET /api/books/[id] with id not in db',  function(done){
        chai
          .request(server)
          .get('/api/books/682932c90ada3783b1672da6')
          .end((err, res) => {
            if (err) return done(err);
            assert.strictEqual(res.body, "no book exists");
            done();
          })
      });
      
      test('Test GET /api/books/[id] with valid id in db',  function(done){
        chai
          .request(server)
          .get('/api/books/68293b9436ec4445319d5af5')
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.property(data, 'title');
            assert.property(data, "_id");
            assert.property(data, "comments");
            done();
          })
      });
      
    });


    suite('POST /api/books/[id] => add comment/expect book object with id', function(){
      
      test('Test POST /api/books/[id] with comment', function(done){
        let testData = {
          _id: "68293b9436ec4445319d5af5",
          comment: "hi"
        }

        chai
          .request(server)
          .post('/api/books/68293b9436ec4445319d5af5')
          .send(testData)
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.property(data, 'title');
            assert.property(data, "_id");
            assert.property(data, "comments");
            assert.property(data, "commentcount")
            done();
          })
      });

      test('Test POST /api/books/[id] without comment field', function(done){
        let testData = {
          _id: "68293b9436ec4445319d5af5"
        }

        chai
          .request(server)
          .post('/api/books/68293b9436ec4445319d5af5')
          .send(testData)
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.strictEqual(data, "missing required field comment")
            done();
          })
      });

      test('Test POST /api/books/[id] with comment, id not in db', function(done){
        let testData = {
          _id: "68293b9436ec4445319d5af5",
          comment: "hi"
        }

        chai
          .request(server)
          .post('/api/books/682932c90ada3783b1672da6')
          .send(testData)
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.strictEqual(data, "no book exists")
            done();
          })
      });
      
    });

    suite('DELETE /api/books/[id] => delete book object id', function() {

      test('Test DELETE /api/books/[id] with valid id in db', function(done){
        chai
          .request(server)
          .delete('/api/books/682932c90ada3783b1672da6')
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.strictEqual(data, "no book exists")
            done();
          })
      });

      test('Test DELETE /api/books/[id] with id not in db', function(done){
        chai
          .request(server)
          .delete('/api/books/682932c90ada3783b1672da6')
          .end((err, res) => {
            if (err) return done(err);
            const data = res.body;
            assert.strictEqual(data, "no book exists")
            done();
          })
      });

    });

  });

});
