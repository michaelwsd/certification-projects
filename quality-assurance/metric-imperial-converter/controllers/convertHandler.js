function ConvertHandler() {
  const validUnits = {
    "gal": "L",
    "L": "gal",
    "mi": "km",
    "km": "mi",
    "lbs": "kg",
    "kg": "lbs"
  }

  const unitString = {
    "gal": "gallons",
    "L": "liters",
    "mi": "miles",
    "km": "kilometers",
    "lbs": "pounds",
    "kg": "kilograms"
  }

  const convertUnit = {
    "gal": 3.78541,
    "L": 1 / 3.78541,
    "mi": 1.60934,
    "km": 1 / 1.60934,
    "lbs": 0.453592,
    "kg": 1 / 0.453592
  };

  this.getNum = function(input) {
    let count = input.split('/').length - 1;
    if (count > 1) return false;

    if (count == 1) {
      let p1 = parseFloat(input);
      let remain = input.slice(p1.toString().length+1);
      let p2 = parseFloat(remain);
      let res = p1/p2;
      return res.toString().includes('.') && res.toString().split(".")[1].length > 5
        ? parseFloat(res.toFixed(5))
        : res;
    } else {
      if (!/\d/.test(input)) return 1;
      else return parseFloat(input); 
    }
  };
  
  this.getUnit = function(input) {
    const unit = input.match(/[^\d.]+$/);
    if (unit[0] === 'L' || unit[0] === 'l') return 'L';
    else if (unit[0].toLowerCase() in validUnits) return unit[0].toLowerCase();
    else return false;
  };
  
  this.getReturnUnit = function(initUnit) {
    return validUnits[initUnit];
  };

  this.spellOutUnit = function(unit) {
    return unitString[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    let res = initNum * convertUnit[initUnit];
    if (res.toString().split(".")[1].length > 5) {
      return parseFloat(res.toFixed(5));
    } else {
      return res;
    }
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
