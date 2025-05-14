'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;
    
    // parse number
    let initNum = convertHandler.getNum(input);
    // parse unit
    let initUnit = convertHandler.getUnit(input);

    if (!initNum && !initUnit) return res.json('invalid number and unit');
    else if (!initNum) return res.json('invalid number');
    else if (!initUnit) return res.json('invalid unit');
    else {
      let returnedUnit = convertHandler.getReturnUnit(initUnit);
      let returnedNum = convertHandler.convert(initNum, initUnit);
      let unitString = convertHandler.getString(initNum, initUnit, returnedNum, returnedUnit);
      res.json({
        "initNum": initNum,
        "initUnit": initUnit,
        "returnNum": returnedNum,
        "returnUnit": returnedUnit,
        "string": unitString
      })
    }

  })

};
