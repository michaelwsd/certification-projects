'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzleString = req.body.puzzle;
      const coordinate = req.body.coordinate;
      const val = req.body.value;
      
      // check string validity
      return res.json(solver.validateCheckString(puzzleString, coordinate, val));
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const puzzleString = req.body.puzzle;
      
      // check string validity
      return res.json(solver.validateSolveString(puzzleString));
    });
};
