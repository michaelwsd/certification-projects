const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("POST1", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        assert.isNumber(Date.parse(data.created_on));
        assert.property(data, 'updated_on');
        assert.isNumber(Date.parse(data.updated_on));
        assert.property(data, 'open');
        assert.isBoolean(data.open);
        assert.isTrue(data.open);
        assert.property(data, '_id');
        assert.isNotEmpty(data._id);
        assert.property(data, 'status_text');
        assert.isEmpty(data.status_text);
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST3", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  }),

  test("POST2", (done) => {
    let test_data = {
        issue_title: 'Faux Issue Title 2',
        issue_text: 'Functional Test - Every field filled in',
        created_by: 'fCC',
        assigned_to: 'Chai and Mocha'
      };

    chai
      .request(server)
      .post('/api/issues/apitest')
      .send(test_data)
      .end ((err, res) => {
        if (err) return done(err);
        const data = res.body;
        assert.isObject(data);
        assert.nestedInclude(data, test_data);
        assert.property(data, 'created_on');
        done();
    })
  })
});
