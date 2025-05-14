const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test("Testing valid whole number input", () => {
        assert.strictEqual(
            convertHandler.getNum("2kg"),
            2,
            "Correctly read valid whole number input"
        );
    });
    test("Testing valid decimal input", () => {
        assert.strictEqual(
            convertHandler.getNum("2.5lbs"),
            2.5,
            "Correctly read valid decimal input"
        );
    });
    test("Testing valid fractional input", () => {
        assert.strictEqual(
            convertHandler.getNum("1/5kg"),
            0.2,
            "Correctly read valid fractional input"
        );
    });
    test("Testing valid fractional input with decimal", () => {
        assert.strictEqual(
            convertHandler.getNum("0.2/0.5kg"),
            0.4,
            "Correctly read valid fractional input with decimal"
        );
    });
    test("Testing invalid double fraction input", () => {
        assert.strictEqual(
            convertHandler.getNum("2/2/7kg"),
            false,
            "Return error for invalid double fraction input"
        );
    });
    test("Testing no numeric input", () => {
        assert.strictEqual(
            convertHandler.getNum("lbs"),
            1,
            "correctly default to 1 when no numeric input is provided"
        );
    });
    test("Testing valid input unit", () => {
        assert.strictEqual(
          convertHandler.getUnit("2gal"),
          "gal",
          "correctly read gal"
        );
        assert.strictEqual(convertHandler.getUnit("2L"), "L", "correctly read L");
        assert.strictEqual(
          convertHandler.getUnit("2mi"),
          "mi",
          "correctly read mi"
        );
        assert.strictEqual(
          convertHandler.getUnit("2km"),
          "km",
          "correctly read km"
        );
        assert.strictEqual(
          convertHandler.getUnit("2lbs"),
          "lbs",
          "correctly read lbs"
        );
        assert.strictEqual(
          convertHandler.getUnit("2kg"),
          "kg",
          "correctly read kg"
        );
      });
    test("Testing invalid input unit", () => {
        assert.strictEqual(
            convertHandler.getUnit("2invalidUnit"),
            false,
            "Correctly return error message for invalid input unit"
        );
    });
    test("Testing return unit for valid input unit 1", () => {
        assert.strictEqual(
            convertHandler.getReturnUnit("gal"),
            "L",
            "Correctly return L as output unit for gal input unit"
        );
    });
    test("Testing return unit for valid input unit 2", () => {
        assert.strictEqual(
            convertHandler.getReturnUnit("L"),
            "gal",
            "Correctly return gal as output unit for L input unit"
          );
    });
    test("Testing return unit for valid input unit 3", () => {
        assert.strictEqual(
            convertHandler.getReturnUnit("mi"),
            "km",
            "Correctly return km as output unit for mi input unit"
          );
    });
    test("Testing return unit for valid input unit 4", () => {
        assert.strictEqual(
            convertHandler.getReturnUnit("km"),
            "mi",
            "Correctly return mi as output unit for km input unit"
          );
    });
    test("Testing return unit for valid input unit 5", () => {
        assert.strictEqual(
            convertHandler.getReturnUnit("lbs"),
            "kg",
            "Correctly return kg as output unit for lbs input unit"
          );
    });
    test("Testing return unit for valid input unit 6", () => {
        assert.strictEqual(
            convertHandler.getReturnUnit("kg"),
            "lbs",
            "Correctly return lbs as output unit for kg input unit"
          );
    });
    test("Testing spelled-out string unit for valid input unit", () => {
        assert.strictEqual(
          convertHandler.spellOutUnit("gal"),
          "gallons",
          "Correctly return gal as output unit for GAL input unit"
        );
    })
    test("Testing spelled-out string unit for valid input unit", () => {
        assert.strictEqual(
          convertHandler.spellOutUnit("mi"),
          "miles",
          "Correctly return miles as output unit for mi input unit"
        );
    })
});