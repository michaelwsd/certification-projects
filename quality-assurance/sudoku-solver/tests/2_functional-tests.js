const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');
const testPuzzles = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('Solve Tests', () => {
    suite('Test solve POSTS /api/solve', () => {
      // 1
      test('1. POST a valid puzzle', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .send({
            puzzle: testPuzzles[0][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.solution, testPuzzles[0][1])
            done()
          })
      })
      // 2
      test('2. POST with missing input data', (done) => {
        chai
          .request(server)
          .post('/api/solve')
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, 'Required field missing')
            done()
          })
      })
      test('3. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
      test('4. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
      test('5. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
    })
  })

  suite('Check Tests', () => {
    suite('Test check POSTS /api/check', () => {
      // 6
      test('6. POST with valid inputs', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "E6",
            value: 2,
            puzzle: testPuzzles[1][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isTrue(res.body.valid)
            done()
          })
      })
      // 7
      test('7. POST with valid inputs with a single sudoku conflict', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "B6",
            value: 2,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid)
            assert.deepEqual(res.body.conflict, ["column"])
            done()
          })
      })
      // 8
      test('8. POST with valid inputs with multiple sudoku conflicts', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "B6",
            value: 9,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid)
            assert.deepEqual(res.body.conflict, [ "row", "region" ])
            done()
          })
      })
      // 9
      test('9. POST with valid inputs with all sudoku conflicts', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: 7,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.isFalse(res.body.valid)
            assert.deepEqual(res.body.conflict, [  "row", "column", "region" ])
            done()
          })
      })
      // 10
      test('10. POST with missing required fields', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            value: 7,
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Required field(s) missing")
            done()
          })
      })
      // 11
      test('11. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
      test('12. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
      test('13. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
      test('14. POST with invalid characters', (done) => {
        chai
          .request(server)
          .post('/api/check')
          .send({
            coordinate: "F8",
            value: "fsda",
            puzzle: testPuzzles[2][0]
          })
          .end((err, res)=>{
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Invalid value")
            done()
          })
      })
    })
  })
});
